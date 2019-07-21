import { IsEmail, Length, IsOptional } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class UserPatchDto {
  @ApiModelProperty({ required: false })
  @IsOptional()
  readonly firstname?: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  readonly lastname?: string;

  @ApiModelProperty({ required: false })
  @IsOptional()
  readonly username?: string;

  @ApiModelProperty({ required: false })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiModelProperty({ required: false })
  @Length(8, 50)
  @IsOptional()
  readonly password?: string;
}
