import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstname: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastname: string;

    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly username: string;
    
    @IsString()
    @IsEmail()
    @MaxLength(30)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
     password: string;

}