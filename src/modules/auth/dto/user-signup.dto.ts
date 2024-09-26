import { IsNotEmpty, IsString, IsEmail, IsNumber } from "class-validator";

export class userSignupDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    
    @IsNotEmpty()
    email: string;

    @IsString()
    phone_number: string;


}
