import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('longtext')
  image: string;

  @ManyToOne(() => Book, book => book.image)
  @JoinColumn({ name: 'bookId' })  
  book: Book;

  @Column('int',  { nullable: true })  
  bookId: number;
}