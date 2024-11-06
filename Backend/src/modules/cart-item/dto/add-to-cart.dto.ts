import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AddCartDto {
    @IsNotEmpty() 
    @IsNumber() 
    @IsPositive()
    bookId: number;

    // @IsNotEmpty()
    // @IsNumber()
    // @IsPositive()
    // userId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

}