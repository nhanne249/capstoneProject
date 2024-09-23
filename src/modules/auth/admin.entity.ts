import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('admin')  // Bảng 'admin'
export class Admin {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}