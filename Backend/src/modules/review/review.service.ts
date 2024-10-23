import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { User } from '../auth/user.entity';
import { Book } from '../book/book.entity';
import { format } from 'date-fns';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async getReviewsByBookId(bookId: number): Promise<any[]> {
    const reviews = await this.reviewRepository.find({
      where: { bookId },
      relations: ['user', 'book'], 
    });

    if (reviews.length === 0) {
      throw new NotFoundException('No reviews found for this book');
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

    let review = this.reviewRepository.create({userId, bookId, rating, content});
    review.reviewDate = new Date();

    return this.reviewRepository.save(review);
  }
}
