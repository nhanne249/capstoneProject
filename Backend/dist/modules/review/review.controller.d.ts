import { ReviewService } from './review.service';
import { postReview } from './dto/post-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReviewByBookId(bookId: number): Promise<any[]>;
    postReview(postReview: postReview, request: Request): Promise<import("./review.entity").Review | {
        message: string;
    }>;
    deleteReview(reviewId: number, request: Request): Promise<{
        message: string;
    }>;
}
