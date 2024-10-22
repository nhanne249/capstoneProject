import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Book } from '../book/book.entity';

@Entity('cart_item')
export class CartItem {
    @PrimaryGeneratedColumn()  
    id: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    price: number;

    @Column('int') 
    quantity: number;

    /*@ManyToOne(() => User, user => user.cart_item, { eager: true })  
    @JoinColumn({ name: 'userId' })  
    user: User;

    @ManyToOne(() => Book, book => book.cart_item, { eager: true })  
    @JoinColumn({ name: 'bookId' })  
    book: Book;*/

    @Column('int')  
    bookId: number;

    @Column('int') 
    userId: number;
}