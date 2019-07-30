import { Reflector } from "@nestjs/core";
import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { AuthType } from "../auth.type";
import { IRequest } from "../../common/interfaces/request.interface";

export function validate(
  typeAuth: AuthType,
  hasPrivilege: Function,
  reflector: Reflector,
  context: ExecutionContext
) {
  const type = reflector.get<string[]>(typeAuth, context.getHandler());
  if (!type) {
    return true;
  }
  const request: IRequest = context.switchToHttp().getRequest();
  const user = request.user;
  if (!(user && user.role && hasPrivilege(type, request))) {
    throw new ForbiddenException(
      "You don't have permission to perform this action"
    );
  }
  return true;
}
