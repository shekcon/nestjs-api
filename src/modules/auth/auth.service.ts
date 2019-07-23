import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserResponse } from "../users/interfaces/response.interface";
import { PasswordService } from "../common/services/password.service";
import { IUser } from "../users/interfaces/users.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly pwdService: PasswordService
  ) {}

  async authenticate(
    username: string,
    password: string
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findOne({ username: username }, false);
    if (user && this.pwdService.verify(password, user.pwdhash)) {
      const { pwdhash, ...info } = user;
      return info;
    }
    return null;
  }

  async login(user: IUser) {
    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      id: user.id,
      token: this.jwtService.sign(payload)
    };
  }
}
