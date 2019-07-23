import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IAuthRequest } from "../interfaces/request.interface";
import { AuthType } from "../auth.type";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(
      AuthType.Roles,
      context.getHandler()
    );
    if (!roles) {
      return true;
    }
    const request: IAuthRequest = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = (): boolean => roles.includes(user.role);
    return user && user.role && hasRole();
  }
}
