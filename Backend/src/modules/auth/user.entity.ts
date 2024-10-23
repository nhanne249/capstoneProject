import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from './enums/role.enum';
import { Review } from '../review/review.entity';

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

    @OneToMany(() => Review, review => review.user)
    review: Review[];

    @Column({ unique: true })
    phone: string;
    
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role;
}
