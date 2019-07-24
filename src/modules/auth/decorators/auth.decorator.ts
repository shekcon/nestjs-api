import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../auth.type";

export const Anonymous = () => SetMetadata(AuthType.Anonymous, "allowed");
export const Claim = () => SetMetadata(AuthType.Claim, "owner");
export const Roles = (...roles: string[]) => SetMetadata(AuthType.Roles, roles);
