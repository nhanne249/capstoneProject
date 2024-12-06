/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartItem } from '../cart-item/cart-item.entity';
import { Book } from '../book/entity/book.entity';
import { OrderStatus, PaymentMethod } from './enum';
import { parse } from 'date-fns';

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

        let defaultStatus: OrderStatus;
        if (createOrderDto.paymentMethod === PaymentMethod.COD) {
            defaultStatus = OrderStatus.PENDING;
        } else if (createOrderDto.paymentMethod === PaymentMethod.CK) {
            defaultStatus = OrderStatus.TRANSFERRING;
        } else {
            throw new BadRequestException('Invalid payment method');
        }

        const order = this.orderDetailRepository.create({
            ...createOrderDto,
            userId: userId,
            status: defaultStatus,
            cartItem: cartItems,
        });

        order.calculateTotalPrice();

        const books = cartItems.map(item => ({
            bookId: item.bookId,
            quantity: item.quantity,
        }));

        order.books = books;

        const savedOrder = await this.orderDetailRepository.save(order);

        for (const item of cartItems) {
            const book = await this.bookRepository.findOne({ where: { id: item.bookId } });
            if (book) {
                book.quantity -= item.quantity;
                await this.bookRepository.save(book);
            }
        }

        await this.cartItemRepository.delete({ userId: userId });

        const transformedCartItems = cartItems.map(item => ({
            title: item.book.title,
            quantity: item.quantity,
            price: item.sellingPrice,
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
        return data;
    }

    async getOrderById(id: number, userId: number): Promise<any> {
        const order = await this.orderDetailRepository.findOne({
            where: { id, userId },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const books: Book[] = [];

        for (const el of order.books) {
            const book = await this.bookRepository.findOne({
                where: { id: Number(el.bookId) },
                select: ['title', 'sellingPrice', 'image_id'],
            });

            if (book) {
                books.push({
                    ...book,
                    quantity: el.quantity,
                });
            } else {
                console.log(`Book with id ${id} not found`);
            }
        }

        return {
            paymentMethod: order.paymentMethod,
            rAddress: order.rAddress,
            rName: order.rName,
            rPhone: order.rPhone,
            status: order.status,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
            cartItem: books,
        };
    }

    async getAllOrders(userId: number): Promise<any[]> {
        const orders = await this.orderDetailRepository.find({
            where: { userId },
            // relations: ['cartItem']
        });

        return await Promise.all(orders.map(async (order) => {
            const books: any[] = [];

            for (const el of order.books) {
                const book = await this.bookRepository.findOne({
                    where: { id: Number(el.bookId) },
                    select: ['title', 'sellingPrice', 'image_id'],
                });

                if (book) {
                    books.push({
                        ...book,
                        quantity: el.quantity,
                    });
                } else {
                    console.log(`Book with id ${el.bookId} not found`);
                }
            }

            return {
                id: order.id,
                paymentMethod: order.paymentMethod,
                rAddress: order.rAddress,
                rName: order.rName,
                rPhone: order.rPhone,
                status: order.status,
                totalPrice: order.totalPrice,
                orderDate: order.orderDate,
                books: books,
            };
        }));
    }

    async getAllOrdersByAdmin(page: number) {
        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        const [orders, total] = await this.orderDetailRepository.findAndCount({
            relations: ['user'],
            skip: offset,
            take: pageSize,
            order: {
                id: 'DESC',
            },
        });

        console.log(orders)

        return {
            data: await Promise.all(orders.map(async (order) => {
                const books: any[] = [];

                for (const el of order.books) {
                    const book = await this.bookRepository.findOne({
                        where: { id: Number(el.bookId) },
                        select: ['title', 'sellingPrice', 'image_id'],
                    });

                    if (book) {
                        books.push({
                            ...book,
                            quantity: el.quantity,
                        });
                    } else {
                        console.log(`Book with id ${el.bookId} not found`);
                    }
                }

                return {
                    id: order.id,
                    paymentMethod: order.paymentMethod,
                    rAddress: order.rAddress,
                    rName: order.rName,
                    rPhone: order.rPhone,
                    status: order.status,
                    totalPrice: order.totalPrice,
                    orderDate: order.orderDate,
                    cartItem: books, // Return the books array
                };
            })),
            pageNumber: page,
            pageSize: pageSize,
            total: total,
        };
    }

    async updateOrder(id: number, updateOrderDto: UpdateOrderDto, userId: number): Promise<OrderDetail> {
        const order = await this.orderDetailRepository.findOne({
            where: { id, userId },
            relations: ['cartItem'], // Ensure 'cartItem' is included
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const fieldsToUpdate: DeepPartial<OrderDetail> = {};

        if (updateOrderDto.status !== undefined) {
            fieldsToUpdate.status = updateOrderDto.status;
        }

        if (updateOrderDto.paymentMethod !== undefined) {
            fieldsToUpdate.paymentMethod = updateOrderDto.paymentMethod;
        }

        if (updateOrderDto.rAddress !== undefined) {
            fieldsToUpdate.rAddress = updateOrderDto.rAddress;
        }

        if (updateOrderDto.rName !== undefined) {
            fieldsToUpdate.rName = updateOrderDto.rName;
        }

        if (updateOrderDto.rPhone !== undefined) {
            fieldsToUpdate.rPhone = updateOrderDto.rPhone;
        }

        if (updateOrderDto.books !== undefined) {
            fieldsToUpdate.books = updateOrderDto.books.map((book) => ({
                bookId: book.bookId,
                quantity: book.quantity,
            }));
        }

        this.orderDetailRepository.merge(order, fieldsToUpdate);

        if (order.cartItem && order.cartItem.length > 0) {
            order.calculateTotalPrice();
        }

        return await this.orderDetailRepository.save(order);
    }



    async deleteOrder(id: number, userId: number) {
        const order = await this.getOrderById(id, userId);

        if (!order) {
            return {
                message: ('Order not found or you are not authorized to delete this order')
            }
        }

        const result = await this.orderDetailRepository.delete({ id });

        if (result.affected === 0) {
            throw new InternalServerErrorException('Failed to delete the order');
        }

        return { message: 'Order deleted successfully' };
    }


    async getRevenueByMonth(year: number, month: number): Promise<any> {
        try {
            const result = await this.orderDetailRepository
                .createQueryBuilder('order')
                .where('YEAR(order.orderDate) = :year', { year })
                .andWhere('MONTH(order.orderDate) = :month', { month })
                .andWhere('order.status = :status', { status: OrderStatus.SUCCESS })
                .select('SUM(order.totalPrice)', 'totalRevenue')
                .getRawOne();

            return {
                month,
                year,
                totalRevenue: result?.totalRevenue ?? 0,
            };
        } catch (error) {
            console.error('Error calculating revenue:', error.message);
            throw new Error('Failed to calculate revenue.');
        }
    }


    async getTotalQuantitySoldByMonth(year: number, month: number): Promise<any> {
        try {
            const orders = await this.orderDetailRepository
                .createQueryBuilder('order')
                .where('YEAR(order.orderDate) = :year', { year })
                .andWhere('MONTH(order.orderDate) = :month', { month })
                .andWhere('order.status = :status', { status: OrderStatus.SUCCESS })
                .select(['order.books'])
                .getMany();

            const totalQuantitySold = orders.reduce((total, order) => {
                if (order.books && Array.isArray(order.books)) {
                    const orderQuantity = order.books.reduce((sum, book) => sum + (book.quantity || 0), 0);
                    return total + orderQuantity;
                }
                return total;
            }, 0);

            return {
                month,
                year,
                totalQuantitySold,
            };
        } catch (error) {
            console.error('Error calculating total quantity sold:', error.message);
            throw new Error('Failed to calculate total quantity sold.');
        }
    }


}
