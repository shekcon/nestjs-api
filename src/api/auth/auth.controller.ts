import { Controller, UseGuards, Post, Request, Get, Response, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/auth.login";

@ApiUseTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Request() req: any,
        @Body() user: LoginDto
    ) {
        return this.authService.login(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('auth/user')
    getUser(@Request() req: any) {
        return req.user;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('auth/admin')
    getAdmin(@Request() req: any) {
        return req.user;
    }

    @Post('register')
    async register(
        @Response() res: any
    ) {
        res.redirect(307, '/api/users')
    }
}