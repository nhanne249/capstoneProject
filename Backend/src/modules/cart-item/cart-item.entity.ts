/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Book } from '../book/book.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Entity('cart_item')
export class CartItem {
    @PrimaryGeneratedColumn()  
    id: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    price: number;

    @Column('int') 
    quantity: number;

    @ManyToOne(() => User, user => user.cart_item, { eager: true })  
    @JoinColumn({ name: 'userId' })  
    user: User;

    @ManyToOne(() => Book, book => book.cart_item, { eager: true })  
    @JoinColumn({ name: 'bookId' })  
    book: Book;
    
    @ManyToOne(() => OrderDetail, orderDetail => orderDetail.cartItem)
    @JoinColumn({ name: 'orderDetailId' })
    orderDetail: OrderDetail;

    @Column('int')  
    bookId: number;

    @Column('int') 
    userId: number;
}