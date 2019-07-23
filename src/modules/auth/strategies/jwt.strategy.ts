import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IToken } from "../interfaces/token.interface";
import { SERCETKEY } from "../../common/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SERCETKEY
    });
  }

  async validate(payload: IToken) {
    return { id: payload.id, username: payload.username, role: payload.role };
  }
}
