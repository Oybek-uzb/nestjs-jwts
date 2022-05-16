import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class AuthDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}