import { User } from '../auth/user.entity';
import { Book } from '../book/entity/book.entity';
export declare class Review {
    id: number;
    rating: number;
    content: string;
    reviewDate: Date;
    user: User;
    book: Book;
    userId: number;
    bookId: number;
}
