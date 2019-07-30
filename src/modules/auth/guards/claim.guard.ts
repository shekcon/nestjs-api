import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AuthType } from "../auth.type";
import { validate } from "./auth.validate";
import { IRequest } from "../../common/interfaces/request.interface";

@Injectable()
export class ClaimGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const hasClaim = (claim: any, req: IRequest): boolean =>
      req.params.id == req.user.id;
    return validate(AuthType.Claim, hasClaim, this.reflector, context);
  }
}
