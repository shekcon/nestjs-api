import { Module, OnModuleInit } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "../users/users.service";
import { UserRole } from "../users/users.role";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "7d" }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  private async initUser() {
    const init = await this.userService.findOne(
      { username: process.env.USERNAME_ADMIN || "admin" },
      false
    );
    if (!init) {
      await this.userService.create({
        firstname: "Sang",
        lastname: "Le",
        username: process.env.USERNAME_ADMIN || "admin",
        email: "quangsang9773@gmail.com",
        password: process.env.PASSWORD_ADMIN || "123456789",
        role: UserRole.admin
      });
    }
  }

  public async onModuleInit() {
    try {
      await this.initUser();
    } catch (error) {
      console.log(error);
    }
  }
}
