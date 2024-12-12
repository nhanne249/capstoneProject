import { OrderStatus, PaymentMethod } from '../enum';
export declare class BookDto {
    bookId: number;
    quantity: number;
}
export declare class UpdateOrderDto {
    status?: OrderStatus;
    paymentMethod?: PaymentMethod;
    rAddress?: string;
    rName?: string;
    rPhone?: string;
    books?: BookDto[];
}
