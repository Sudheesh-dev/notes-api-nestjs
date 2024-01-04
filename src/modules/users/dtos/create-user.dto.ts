import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @MinLength(8)
    @MaxLength(16)
    @IsString()
    password: string;
    @MinLength(1)
    @MaxLength(100)
    name: string
}

export class LoginUserDto{
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @MinLength(1)
    password: string;
}