import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Book } from '../book/book.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  rating: number;  

  @Column('text', { nullable: true })
  content: string;  

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  reviewDate: Date;  

  /*@ManyToOne(() => User, user => user.review, { eager: true })  
  @JoinColumn({ name: 'userId' })  
  user: User;

  @ManyToOne(() => Book, book => book.review, { eager: true })  
  @JoinColumn({ name: 'bookId' })  
  book: Book;*/
  
  @Column('int')
  userId: number;  

  @Column('int')
  bookId: number;  
}
