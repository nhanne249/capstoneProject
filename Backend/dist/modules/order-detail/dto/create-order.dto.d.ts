import { OrderStatus, PaymentMethod } from '../enum';
export declare class CreateOrderDto {
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    rAddress: string;
    rName: string;
    rPhone: string;
}
