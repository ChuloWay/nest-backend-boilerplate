import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;
    
    @IsString()
    @IsEmail()
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

}