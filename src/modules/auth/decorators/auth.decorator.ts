import { SetMetadata, UseGuards } from "@nestjs/common";
import { AuthType } from "../auth.type";
import { AuthorizeGuard } from "../guards/authorize.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ClaimGuard } from "../guards/claim.guard";

export const Anonymous = () => SetMetadata(AuthType.Anonymous, "allowed");
export const Claim = () => SetMetadata(AuthType.Claim, "owner");
export const Roles = (...roles: string[]) => SetMetadata(AuthType.Roles, roles);
export const Authorize = () =>
  UseGuards(AuthorizeGuard, RolesGuard, ClaimGuard);
