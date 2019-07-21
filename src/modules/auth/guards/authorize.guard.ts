import { Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { AuthType } from "../auth.type";

@Injectable()
export class Authorize extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAnonymous = this.reflector.get<string[]>(
      AuthType.Anonymous,
      context.getHandler()
    );
    if (isAnonymous) {
      return true;
    }
    return super.canActivate(context);
  }
}
