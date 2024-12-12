import { Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartItem } from '../cart-item/cart-item.entity';
import { Book } from '../book/entity/book.entity';
import { OrderStatus, PaymentMethod } from './enum';
export declare class OrderDetailService {
    private orderDetailRepository;
    private cartItemRepository;
    private bookRepository;
    constructor(orderDetailRepository: Repository<OrderDetail>, cartItemRepository: Repository<CartItem>, bookRepository: Repository<Book>);
    createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<{
        paymentMethod: PaymentMethod;
        rAddress: string;
        rName: string;
        rPhone: string;
        status: OrderStatus;
        totalPrice: number;
        orderDate: Date;
        cartItem: {
            title: string;
            quantity: number;
            price: number;
        }[];
    }>;
    getOrderById(id: number, userId: number): Promise<any>;
    getAllOrders(userId: number): Promise<any[]>;
    getAllOrdersByAdmin(page: number): Promise<{
        data: {
            id: number;
            paymentMethod: PaymentMethod;
            rAddress: string;
            rName: string;
            rPhone: string;
            status: OrderStatus;
            totalPrice: number;
            orderDate: Date;
            cartItem: any[];
        }[];
        pageNumber: number;
        pageSize: number;
        total: number;
    }>;
    updateOrder(id: number, updateOrderDto: UpdateOrderDto, userId: number): Promise<OrderDetail>;
    deleteOrder(id: number, userId: number): Promise<{
        message: string;
    }>;
    getRevenueByMonth(year: number, month: number): Promise<any>;
    getTotalQuantitySoldByMonth(year: number, month: number): Promise<any>;
}
