import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IAuthRequest } from "../interfaces/request.interface";
import { AuthType } from "../auth.type";

@Injectable()
export class ClaimGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const claim = this.reflector.get<string[]>(
      AuthType.Claim,
      context.getHandler()
    );
    if (!claim) {
      return true;
    }
    const request: IAuthRequest = context.switchToHttp().getRequest();
    const user = request.user;
    const hasClaim = (): boolean => request.params.id == user.id;
    return user && user.role && hasClaim();
  }
}
