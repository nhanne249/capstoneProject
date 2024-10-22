/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('api/review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
    @Get('book/:bookId')
    async getReviewByBookId(@Param('bookId') bookId: number) {
        return this.reviewService.getReviewsByBookId(bookId);
    }

    @Post('book/:bookId/rating')
    async setRating(@Param('bookId') bookId: number, @Body('rating') rating: number, @Body('userId') userId: number) {
        return this.reviewService.setRating(bookId, userId, rating);
    }

    @Post('book/:bookId/review')
    async setReview(@Param('bookId') bookId: number, @Body('content') content: string, @Body('userId') userId: number) {
        return this.reviewService.setReview(bookId, userId, content);
    }

}
