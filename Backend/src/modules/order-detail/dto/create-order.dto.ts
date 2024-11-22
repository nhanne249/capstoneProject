/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { OrderStatus, PaymentMethod } from '../enum';
import { Type } from 'class-transformer';
import { CartItem } from 'src/modules/cart-item/cart-item.entity';


export class CreateOrderDto {
  // @IsArray()
  // // @IsNotEmpty()
  // @Type(() => CartItem)
  // cartItem: number[];

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  rAddress: string;

  @IsString()
  rName: string;

  @IsString()
  rPhone: string;

  // @IsNumber()
  // userId: number;
}
