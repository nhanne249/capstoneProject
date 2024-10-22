import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { Book } from '../book/book.entity';
import { User } from '../auth/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review, Book, User])],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}
