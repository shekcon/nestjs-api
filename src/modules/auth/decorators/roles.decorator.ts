import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../auth.type";

export const Roles = (...roles: string[]) => SetMetadata(AuthType.Roles, roles);
