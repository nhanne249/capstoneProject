import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from '../auth/user.entity';
import { Book } from '../book/entity/book.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly userRepository;
    private readonly bookRepository;
    private readonly orderDetailRepository;
    constructor(reviewRepository: Repository<Review>, userRepository: Repository<User>, bookRepository: Repository<Book>, orderDetailRepository: Repository<OrderDetail>);
    getReviewsByBookId(bookId: number): Promise<any[]>;
    postReview(bookId: number, userId: number, rating: number, content: string): Promise<Review | {
        message: string;
    }>;
    deleteReview(reviewId: number, userId: number): Promise<{
        message: string;
    }>;
}
