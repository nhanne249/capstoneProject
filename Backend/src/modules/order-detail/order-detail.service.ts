import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartItem } from '../cart-item/cart-item.entity';
import { Book } from '../book/entity/book.entity';

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async createOrder(createOrderDto: CreateOrderDto, userId: number) {
        const cartItems = await this.cartItemRepository.find({ where: { userId: userId } });

        if (cartItems.length === 0) {
            throw new NotFoundException('No cart items found for the specified user');
        }

        const order = this.orderDetailRepository.create({
            ...createOrderDto,
            userId: userId,
            cartItem: cartItems,
        });

        order.calculateTotalPrice();

        const savedOrder = await this.orderDetailRepository.save(order);

        const transformedCartItems = cartItems.map(item => ({
            title: item.book.title,
            quantity: item.quantity,
            price: item.price,
        }));
    
        const data = {
            paymentMethod: savedOrder.paymentMethod,
            rAddress: savedOrder.rAddress,
            rName: savedOrder.rName,
            rPhone: savedOrder.rPhone,
            status: savedOrder.status,
            totalPrice: savedOrder.totalPrice,
            orderDate: savedOrder.orderDate,
            cartItem: transformedCartItems,
        };

        for (const item of cartItems) {
            const book = await this.bookRepository.findOne({ where: { id: item.bookId } });
            if (book) {
                book.quantity -= item.quantity;
                await this.bookRepository.save(book);
            }
        }
        await this.cartItemRepository.delete({ userId: userId });

        return data;
    }

    async getOrderById(id: number, userId: number): Promise<any> {
        const order = await this.orderDetailRepository.findOne({ 
            where: { id, userId }, 
            relations: ['cartItem'] 
        });
    
        if (!order) {
            throw new NotFoundException('Order not found');
        }
    
        // Transforming the cart items for the response
        const transformedCartItems = order.cartItem.map(item => ({
            title: item.book.title,
            quantity: item.quantity,
            price: item.price,
        }));
    
        return {
            paymentMethod: order.paymentMethod,
            rAddress: order.rAddress,
            rName: order.rName,
            rPhone: order.rPhone,
            status: order.status,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
            cartItem: transformedCartItems,
        };
    }

    async getAllOrders(userId: number): Promise<any[]> {
        const orders = await this.orderDetailRepository.find({ 
            where: { userId }, 
            relations: ['cartItem'] 
        });

        // Transforming all orders to include cart items in a simpler structure
        return orders.map(order => ({
            id: order.id,
            paymentMethod: order.paymentMethod,
            rAddress: order.rAddress,
            rName: order.rName,
            rPhone: order.rPhone,
            status: order.status,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
            cartItem: order.cartItem.map(item => ({
                title: item.book.title,
                quantity: item.quantity,
                price: item.price,
            })),
        }));
    }

    async updateOrder(id: number, updateOrderDto: UpdateOrderDto, userId: number): Promise<OrderDetail> {
        const order = await this.getOrderById(id, userId);

        // If cartItem IDs are provided, fetch the corresponding CartItem entities
        if (updateOrderDto.cartItem) {
            const cartItems = await Promise.all(
                updateOrderDto.cartItem.map(async (itemId) => 
                    this.cartItemRepository.findOne({ where: { id: itemId } })
                )
            );

            order.cartItem = cartItems.filter(item => item !== null); // Filter out any items that weren't found
        }

        // Update other fields
        const updateData: DeepPartial<OrderDetail> = {
            ...updateOrderDto,
            cartItem: order.cartItem,
        };

        // Remove cartItem from updateData since it's not part of the entity
        delete updateData.cartItem;

        this.orderDetailRepository.merge(order, updateData);
        order.calculateTotalPrice();
        return await this.orderDetailRepository.save(order);
    }

    async deleteOrder(id: number, userId: number): Promise<void> {
        const result = await this.orderDetailRepository.delete({ id, userId });

        if (result.affected === 0) {
            throw new NotFoundException('Order not found or not authorized to delete this order');
        }
    }
}
