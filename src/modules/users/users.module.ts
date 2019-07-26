import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PasswordService } from "../common/services/password.service";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "../database/database.service";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule.forRoot()],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, DatabaseService],
  exports: [UsersService]
})
export class UsersModule {}
