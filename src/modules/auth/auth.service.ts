import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.entity";
import { UserResponse } from "../users/interfaces/response.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(username: string, pwd: string): Promise<UserResponse | null> {
    const user = await this.usersService.findOne({ username: username }, false);
    if (user) {
      const { pwdhash, ...info } = user;
      return info;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
