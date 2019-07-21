import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../auth.type";

export const Anonymous = () => SetMetadata(AuthType.Anonymous, "allowed");
