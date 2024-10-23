import { Body, Controller, Delete, Get, Post, Param, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { postReview } from './dto/post-review.dto';

@Controller('api/review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
    @Get()
    async getReviewByBookId(@Body('bookId') bookId: number) {
        return this.reviewService.getReviewsByBookId(bookId);
    }

    @Post()
    async postReview(@Body() postReview: postReview) {
        return this.reviewService.postReview(postReview.bookId, postReview.userId, postReview.rating, postReview.content);
    }

}
