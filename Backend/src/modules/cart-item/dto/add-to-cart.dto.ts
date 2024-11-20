import { IsInt, IsPositive, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BookItemDto {
  @IsInt()
  bookId: number;

  @IsPositive()
  quantity: number;
}

export class AddCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookItemDto)
  books: BookItemDto[]; 
}

