import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './order-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';
import { CartItem } from '../cart-item/cart-item.entity';
import { User } from '../auth/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail, CartItem, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [OrderDetailController],
  providers: [OrderDetailService]
})
export class OrderDetailModule {}
