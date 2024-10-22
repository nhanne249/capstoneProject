import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('simple-array', { nullable: true })
  image: string[];

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 0 })
  costPrice: number;

  @Column('decimal', { precision: 10, scale: 0 })
  sellingPrice: number;
}
