import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.entity';
import { Book } from '../book/entity/book.entity';
import { User } from '../auth/user.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Book, User, OrderDetail]),
  JwtModule.register({
    secret: process.env.JWT_SECRET
  }),],
  controllers: [CartItemController],
  providers: [CartItemService]
})
export class CartItemModule {}
