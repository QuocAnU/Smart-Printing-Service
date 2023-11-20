import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    BKNetID: string

    @IsString()
    @MinLength(6)
    password: string;
}