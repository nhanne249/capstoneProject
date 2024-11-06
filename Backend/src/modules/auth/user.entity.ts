import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from './enums/role.enum';
import { Review } from '../review/review.entity';
import { CartItem } from '../cart-item/cart-item.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;
    
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role;

    @OneToMany(() => Review, review => review.user)
    review: Review[];
    
    @OneToMany(() => CartItem, cartItem => cartItem.user)
    cart_item: CartItem[]
    
    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
    orderDetail: OrderDetail[];
}
