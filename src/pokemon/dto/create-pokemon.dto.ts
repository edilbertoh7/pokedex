import { IsIn, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    //se realizan las validaciones necesarias para los campos del pokemon

    @IsInt()
    @IsPositive()
    @Min(1)
    
    no: number;


    @IsString()
    @MinLength(1)
    name: string;
}
