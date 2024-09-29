import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role.enum';

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
    phone_number: string;
    
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
    })
    role: Role;
}
