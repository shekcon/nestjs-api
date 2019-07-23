import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserResponse } from "../../users/interfaces/response.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, passpord: string): Promise<UserResponse> {
    const user = await this.authService.authenticate(username, passpord);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
