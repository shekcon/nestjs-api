
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/resources/users.model';
import { UserInfo } from '../users/resources/users.info';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pwd: string): Promise<UserInfo | null> {
        const user = await this.usersService.getByUsername(username);
        if (user && user.password === pwd) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, id: user.id, role: user.role };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}