/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
      where: { book: { id: bookId } },
      relations: ['user', 'book'],
    });

    if (reviews.length === 0) {
      throw new NotFoundException('No reviews found for this book');
    }

    return reviews.map((review) => ({
      rating: review.rating,
      content: review.content,
      reviewDate: format(new Date(review.reviewDate), 'HH:mm dd/MM/yyyy'),
      name: review.user.name,
    }));
  }

  async postReview(bookId: number, userId: number, rating: number, content: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const orderDetail = await this.orderDetailRepository.findOne({
      where: {
        user: { id: userId },
        status: OrderStatus.SUCCESS,
      },
      // relations: ['cartItem'],
    });

    const hasPurchasedBook = orderDetail?.books.some((item) => item.bookId === bookId);
    if (!hasPurchasedBook) {
      return {message: ('You can only review books you have purchased.')};
    }

    const review = this.reviewRepository.create({
      user,
      book,
      rating,
      content,
      reviewDate: new Date(),
    });

    return await this.reviewRepository.save(review);
  }

  async deleteReview(reviewId: number, userId: number) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.user.id !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }

    await this.reviewRepository.remove(review);
    return { message: 'Review deleted successfully' };
  }
}
