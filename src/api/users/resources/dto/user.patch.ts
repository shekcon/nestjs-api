import { IsEmail, IsNotEmpty, Length, ValidateIf, IsOptional } from 'class-validator';

export class UserPatchDto {
    @IsOptional()
    readonly firstname: string;

    @IsOptional()
    readonly lastname: string;

    @IsOptional()
    readonly username: string;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @Length(8, 50)
    @IsOptional()
    readonly password: string;
}