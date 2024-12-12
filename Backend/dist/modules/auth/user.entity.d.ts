import { Role } from './enums/role.enum';
import { Review } from '../review/review.entity';
import { CartItem } from '../cart-item/cart-item.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    review: Review[];
    cart_item: CartItem[];
    orderDetail: OrderDetail[];
}
