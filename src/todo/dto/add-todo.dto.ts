import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AddTodoDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(
        6,
        {
            message : 'La taille min est 6 char'
        },
     )
    name : string;

    @IsString()
    @IsNotEmpty()
    desc : string;

     
}