import { IsEmail, IsNotEmpty } from "class-validator";

export class UserSubscribeDto{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()  
    email: string;

    @IsNotEmpty()
    password: string;
}