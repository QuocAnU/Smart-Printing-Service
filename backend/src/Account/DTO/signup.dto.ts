import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MinLength } from "class-validator";

export class SignupDto{
    @IsNotEmpty()
    @IsString()
    Fullname: string;

    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    BKNetID: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    Password: string

    @IsNumber()
    @Length(6,6)
    StuID: number
}