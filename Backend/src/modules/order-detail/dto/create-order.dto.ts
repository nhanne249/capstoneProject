/* eslint-disable prettier/prettier */
import { IsEnum, IsString } from 'class-validator';
import { OrderStatus, PaymentMethod } from '../enum';


export class CreateOrderDto {
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
}
