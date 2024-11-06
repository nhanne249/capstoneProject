import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class postReview {
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
    rating: number;

    content?: string;
}