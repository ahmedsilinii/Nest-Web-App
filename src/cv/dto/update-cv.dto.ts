import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber, Max, Min, Length } from 'class-validator';

export class UpdateCvDto {
   
    @IsOptional()
    @IsString()
    name:string;
    
    @IsOptional()
    firstname:string;
    
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(18)
    @Max(65)
    age:number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    cin : number;

    @IsOptional()
    @IsString()  
    job : string;

    @IsOptional()
    @IsString()  
    path: string;
}