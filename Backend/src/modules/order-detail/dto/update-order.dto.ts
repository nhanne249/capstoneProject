import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus, PaymentMethod } from '../enum';
import { Type } from 'class-transformer';

export class BookDto {
    @IsNumber()
    bookId: number;

    @IsNumber()
    quantity: number;
}
export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;

    @IsOptional()
    @IsString()
    rAddress?: string;

    @IsOptional()
    @IsString()
    rName?: string;

    @IsOptional()
    @IsString()
    rPhone?: string;

    @IsOptional()
    @IsArray()
    @Type(() => BookDto)
    books?: BookDto[];
}