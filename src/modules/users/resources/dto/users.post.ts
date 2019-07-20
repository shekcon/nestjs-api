import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserPostDto {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly firstname: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly lastname: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly username: string;

    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    
    @ApiModelProperty()
    @Length(8, 50)
    @IsNotEmpty()
    readonly password: string;
}