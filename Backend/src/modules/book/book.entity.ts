import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  quantity: number;

  @Column()
  author: string;

  @Column({ nullable: true })
  image: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Review, review => review.book)
  review: Review[];

  @Column('decimal', { precision: 10, scale: 0 })
  costPrice: number;

  @Column('decimal', { precision: 10, scale: 0 })
  sellingPrice: number;
}
