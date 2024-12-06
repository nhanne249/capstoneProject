/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/user.entity';
import { Book } from './modules/book/entity/book.entity';
import { UsersModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { CartItemModule } from './modules/cart-item/cart-item.module';
import { CartItem } from './modules/cart-item/cart-item.entity';
import { ReviewModule } from './modules/review/review.module';
import { Review } from './modules/review/review.entity';
import { OrderDetail } from './modules/order-detail/order-detail.entity';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { Image } from './modules/book/entity/image.entity';
import { PayosModule } from './modules/payos/payos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Book, CartItem, Review, OrderDetail, Image],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  AuthModule, UsersModule, BookModule, CartItemModule, ReviewModule, OrderDetailModule, PayosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
