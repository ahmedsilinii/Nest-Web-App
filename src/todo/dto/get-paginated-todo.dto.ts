import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetPaginatedTodo{
    @IsNumber()
    @IsOptional()
    @Type(
        () => Number
    )
    page : number;

    @IsNumber()
    @IsOptional()
    item : number;
}