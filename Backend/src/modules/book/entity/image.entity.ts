/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('longblob') 
  image: Buffer;

  @ManyToOne(() => Book, (book) => book.image)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column('int', { nullable: true })
  bookId: number;

  @Column('varchar', { nullable: true })
  mimeType: string;

  @Column('varchar', { nullable: true })
  fileName: string;

  @Column('int', { nullable: true }) 
  size: number;
}