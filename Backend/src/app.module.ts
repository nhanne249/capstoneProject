import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/user.entity';
import { Book } from './modules/book/entity/book.entity';
import { UsersModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { env } from 'process';
import { CartItemModule } from './modules/cart-item/cart-item.module';
import { CartItem } from './modules/cart-item/cart-item.entity';
import { ReviewModule } from './modules/review/review.module';
import { Review } from './modules/review/review.entity';
import { OrderDetail } from './modules/order-detail/order-detail.entity';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { Image } from './modules/book/entity/image.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-1563abc0-daweb.d.aivencloud.com',
    port: 22337,
    username: 'avnadmin',
    password: 'AVNS_Rb6CTJ22C4e_O8CDMSz',
    database: 'defaultdb',
    entities: [User, Book, CartItem, Review, OrderDetail, Image],
    synchronize: true,
  }),
  AuthModule, UsersModule, BookModule, CartItemModule, ReviewModule, OrderDetailModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
