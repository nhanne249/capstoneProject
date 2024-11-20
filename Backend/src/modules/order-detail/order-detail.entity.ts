/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CartItem } from '../cart-item/cart-item.entity';
import { User } from '../auth/user.entity';
import { OrderStatus, PaymentMethod } from './enum';

@Entity('order-detail')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 }) 
  totalPrice: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: false,
  })
  paymentMethod: PaymentMethod;

  @Column()
  rAddress: string;

  @Column()
  rName: string;

  @Column()
  rPhone: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orderDetail, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.orderDetail, { cascade: true })
  // @JoinColumn({})
  cartItem: CartItem[];

  // @BeforeInsert()
  // @BeforeUpdate()
  calculateTotalPrice() {
    this.totalPrice = this.cartItem.reduce((sum, item) => sum + Number(item.sellingPrice), 0);
  }
}
