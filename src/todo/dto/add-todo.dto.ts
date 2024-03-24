import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTodoDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(
        6,
        {
            message : 'La taille min est 6 char'
        },
    )
    @MaxLength(25)
    name : string;

    @IsString()
    @IsNotEmpty()
    desc : string;

     
}