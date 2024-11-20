/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Book } from '../book/entity/book.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Entity('cart_item')
export class CartItem {
    @PrimaryGeneratedColumn()  
    cartId: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    sellingPrice: number;

    @Column('int') 
    quantity: number;

    @ManyToOne(() => User, user => user.cart_item, { eager: true, onDelete: 'CASCADE' })  
    @JoinColumn({ name: 'userId' })  
    user: User;

    @ManyToOne(() => Book, book => book.cart_item, { eager: true, onDelete: 'CASCADE' })  
    @JoinColumn({ name: 'bookId' })  
    book: Book;

    @ManyToOne(() => OrderDetail, orderDetail => orderDetail.cartItem, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'orderDetailId' })
    orderDetail: OrderDetail;

    @Column('int')  
    bookId: number;

    @Column('int') 
    userId: number;
}