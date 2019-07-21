import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../auth.type";

export const Claim = () => SetMetadata(AuthType.Claim, "owner");
