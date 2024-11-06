/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param, UseGuards, SetMetadata, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { postReview } from './dto/post-review.dto';
import { RolesGuard, AuthGuard } from '../auth/auth.guard';

const Roles = (...role: string[]) => SetMetadata('role', role);

@UseGuards(AuthGuard, RolesGuard)
@Controller('api/review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
    @Get()
    async getReviewByBookId(@Body('bookId') bookId: number) {
        return this.reviewService.getReviewsByBookId(bookId);
    }

    @Post()
    async postReview(@Body() postReview: postReview, @Req() request: Request) {
        const userPayload = request['user'];
        const userId = userPayload.sub;
        return this.reviewService.postReview(postReview.bookId, userId, postReview.rating, postReview.content);
    }

}

