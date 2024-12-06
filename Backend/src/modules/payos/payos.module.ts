import { Module } from '@nestjs/common';
import { PayosController } from './payos.controller';
import { PayosService } from './payos.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/modules/order-detail/order-detail.entity';
import { CartItem } from 'src/modules/cart-item/cart-item.entity';
import { User } from 'src/modules/auth/user.entity';
import { Book } from 'src/modules/book/entity/book.entity';
import { OrderDetailModule } from 'src/modules/order-detail/order-detail.module';
import { OrderDetailService } from '../order-detail/order-detail.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([OrderDetail, CartItem, User, Book]),
      OrderDetailModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET
      }),
    ],
    controllers: [PayosController],
    providers: [PayosService, OrderDetailService]
  })
  export class PayosModule {}