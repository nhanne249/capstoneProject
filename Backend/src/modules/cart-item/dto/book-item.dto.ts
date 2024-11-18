import { IsInt, IsPositive } from 'class-validator';

export class BookItemDto {
  @IsInt()
  @IsPositive()
  bookId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
