import { IsNotEmpty, Length } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty()
  @Length(8, 50)
  @IsNotEmpty()
  readonly password: string;
}
