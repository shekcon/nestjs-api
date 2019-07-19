import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "../auth/roles/roles.guard";


@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }