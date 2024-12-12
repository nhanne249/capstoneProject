import { CartItem } from '../cart-item/cart-item.entity';
import { User } from '../auth/user.entity';
import { OrderStatus, PaymentMethod } from './enum';
export declare class OrderDetail {
    id: number;
    totalPrice: number;
    orderDate: Date;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    rAddress: string;
    rName: string;
    rPhone: string;
    userId: number;
    user: User;
    cartItem: CartItem[];
    books: {
        bookId: number;
        quantity: number;
    }[];
    calculateTotalPrice(): void;
}
