import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthType } from "../auth.type";
import { validate } from "./auth.validate";
import { IRequest } from "../../common/interfaces/request.interface";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const hasRole = (roles: any, request: IRequest): boolean =>
      roles.includes(request.user.role);
    return validate(AuthType.Roles, hasRole, this.reflector, context);
  }
}
