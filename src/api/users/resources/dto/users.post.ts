import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserPostDto {
    @IsNotEmpty()
    readonly firstname: string;

    @IsNotEmpty()
    readonly lastname: string;

    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @Length(8, 50)
    @IsNotEmpty()
    readonly password: string;
}