/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, SetMetadata, Req, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { postReview } from './dto/post-review.dto';
import { RolesGuard, AuthGuard } from '../auth/auth.guard';

const Roles = (...role: string[]) => SetMetadata('role', role);

@Controller('api/review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
    @Get(':bookId')
    async getReviewByBookId(@Param('bookId') bookId: number) {
        return this.reviewService.getReviewsByBookId(bookId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async postReview(@Body() postReview: postReview, @Req() request: Request) {
        const userPayload = request['user'];
        const userId = userPayload.sub;
        return this.reviewService.postReview(postReview.bookId, userId, postReview.rating, postReview.content);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':reviewId')
    async deleteReview(@Param('reviewId') reviewId: number, @Req() request: Request) {
        const userPayload = request['user'];
        const userId = userPayload.sub;

        // Ensure the user is authorized to delete this review, for example, by checking if they are the author
        return this.reviewService.deleteReview(reviewId, userId);
    }
}

