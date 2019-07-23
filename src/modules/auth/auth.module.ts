import { Module, OnModuleInit } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "../users/users.service";
import { UserRole } from "../users/users.role";
import { PasswordService } from "../common/services/password.service";
import {
  SERCETKEY,
  ADMIN_EMAIL,
  ADMIN_FIRSTNAME,
  ADMIN_LASTNAME,
  ADMIN_PASSWORD,
  ADMIN_USERNAME
} from "../common/config";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: SERCETKEY,
      signOptions: { expiresIn: "7d" }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PasswordService],
  controllers: [AuthController]
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  private async initUser() {
    const init = await this.userService.findOne(
      { username: ADMIN_USERNAME },
      false
    );
    if (!init) {
      await this.userService.create({
        firstname: ADMIN_FIRSTNAME,
        lastname: ADMIN_LASTNAME,
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: UserRole.admin
      });
    }
  }

  public async onModuleInit() {
    await this.initUser();
  }
}
