/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from '../auth/user.entity';
import { Book } from '../book/entity/book.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { OrderStatus } from '../order-detail/enum';
import { format } from 'date-fns';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async getReviewsByBookId(bookId: number): Promise<any[]> {
    const reviews = await this.reviewRepository.find({
      where: { bookId },
      relations: ['user', 'book'], 
    });

    if (reviews.length === 0) {
      return { error: new NotFoundException('No reviews found for this book') } as any;
    }

    return reviews.map(reviews => ({
      rating: reviews.rating,
      content: reviews.content,
      reviewDate: format(new Date(reviews.reviewDate), 'HH:mm dd/MM/yyyy'),
      name: reviews.user.name
    }));
  }

  async postReview(bookId: number, userId: number, rating: number, content: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const orderDetail = await this.orderDetailRepository.findOne({
      where: {
        userId: userId,
        status: OrderStatus.SUCCESS,
      },
      relations: ['cartItem'],
    });

    const hasPurchasedBook = orderDetail?.cartItem.some((item) => item.bookId === bookId);
    if (!hasPurchasedBook) {
      return {message: ('You can only review books you have purchased.')};
    }

    const review = this.reviewRepository.create({userId, bookId, rating, content});
    review.reviewDate = new Date();

    return this.reviewRepository.save(review);
  }

  async deleteReview(reviewId: number, userId: number) {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });

    if (!review) {
        return { message: 'Review not found' };
    }

    if (review.userId !== userId) {
        return { message: 'You are not authorized to delete this review' };
    }

    await this.reviewRepository.delete({ id: reviewId });
    return { message: 'Review deleted successfully' };
  }
}
