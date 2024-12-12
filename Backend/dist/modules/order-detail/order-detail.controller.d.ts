import { OrderDetailService } from './order-detail.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    createOrder(createOrderDto: CreateOrderDto, request: Request): Promise<{
        message: string;
        data: {
            paymentMethod: import("./enum").PaymentMethod;
            rAddress: string;
            rName: string;
            rPhone: string;
            status: import("./enum").OrderStatus;
            totalPrice: number;
            orderDate: Date;
            cartItem: {
                title: string;
                quantity: number;
                price: number;
            }[];
        };
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    getAllOrdersByAdmin(page: string): Promise<{
        message: string;
        data: {
            data: {
                id: number;
                paymentMethod: import("./enum").PaymentMethod;
                rAddress: string;
                rName: string;
                rPhone: string;
                status: import("./enum").OrderStatus;
                totalPrice: number;
                orderDate: Date;
                cartItem: any[];
            }[];
            pageNumber: number;
            pageSize: number;
            total: number;
        };
        error?: undefined;
    } | {
        message: string;
        error: any;
        data?: undefined;
    }>;
    getOrderById(id: number, request: Request): Promise<any>;
    getAllOrders(request: Request): Promise<any>;
    updateOrder(id: number, updateOrderDto: UpdateOrderDto, request: Request): Promise<any>;
    deleteOrder(id: number, request: Request): Promise<any>;
    getRevenueByMonth(body: {
        year: number;
        month: number;
    }, request: Request): Promise<any>;
    getTotalQuantitySoldByMonth(body: {
        year: number;
        month: number;
    }): Promise<any>;
}
