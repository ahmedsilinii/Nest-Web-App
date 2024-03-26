import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber, Max, Min, Length } from 'class-validator';

export class AddCvDto {
   
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsString()
    firstname:string;
    
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(18)
    @Max(65)
    age:number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Length(8)
    cin : number;

    @IsNotEmpty()
    @IsString()  
    job : string;

    @IsOptional()
    @IsString()  
    path: string;
}