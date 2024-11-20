/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from '../../cart-item/cart-item.entity';
import { Review } from '../../review/review.entity';
import { Image } from './image.entity';

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

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 0 })
  costPrice: number;

  @Column('decimal', { precision: 10, scale: 0 })
  sellingPrice: number;
  
  @OneToMany(() => Review, review => review.book)
  review: Review[];
  
  @OneToMany(() => CartItem, cartItem => cartItem.book)
  cart_item: CartItem[]

  @OneToMany(() => Image, image => image.book)
  image: Image[]

  @Column('simple-array', { nullable: true })
  image_id: number[];
}
