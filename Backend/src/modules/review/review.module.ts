import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { Book } from '../book/entity/book.entity';
import { User } from '../auth/user.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review, Book, User, OrderDetail]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}
