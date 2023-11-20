import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, MinLength } from "class-validator";

export class SignupDto{
    @IsNotEmpty()
    @IsString()
    Fullname: string;

    @IsNotEmpty()
    @IsEmail({}, {message: "Dont't trick me! Get me a fucking right email!"})
    Email: string;

    @IsNotEmpty()
    BKNetID: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: "Too weak! Please type harder or get a more powerful password!"})
    Password: string

    @IsNumber()
    @Length(6,6, {message: 'Invalid Student ID!'})
    StuID: number
}