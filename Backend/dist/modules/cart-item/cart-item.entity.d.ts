import { User } from '../auth/user.entity';
import { Book } from '../book/entity/book.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
export declare class CartItem {
    cartId: number;
    sellingPrice: number;
    quantity: number;
    user: User;
    book: Book;
    orderDetail: OrderDetail;
    bookId: number;
    userId: number;
}
