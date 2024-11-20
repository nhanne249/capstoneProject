/* eslint-disable prettier/prettier */
import { IsInt, IsPositive } from 'class-validator';

export class BookItemDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
