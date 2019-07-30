import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IToken } from "../interfaces/token.interface";
import { SERCETKEY } from "../../common/config";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SERCETKEY
    });
  }

  async validate(payload: IToken) {
    const user = await this.userService.findOne(
      {
        id: payload.id,
        username: payload.username
      },
      false
    );
    if (!user) {
      throw new UnauthorizedException("Invalid token or missing token");
    }
    return { id: payload.id, username: payload.username, role: payload.role };
  }
}
