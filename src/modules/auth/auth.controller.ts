import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Response,
  Body,
  UseFilters,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Authorize } from "./decorators/auth.decorator";
import { IResponse } from "../common/interfaces/response.interface";
import { IRequest } from "../common/interfaces/request.interface";
import { UserPostDto } from "../users/dto/users.post";
import { UserRole } from "../users/users.role";
import { AuthLogin } from "./dto/auth.login";
import { Roles, Anonymous } from "./decorators/auth.decorator";

@Authorize()
@UseInterceptors()
@UseFilters()
@ApiUseTags("Auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Anonymous()
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req: IRequest, @Body() user: AuthLogin) {
    return this.authService.login(req.user);
  }

  @Roles(UserRole.admin)
  @ApiBearerAuth()
  @Get("auth/user")
  getUser(@Request() req: IRequest) {
    return req.user;
  }

  @ApiBearerAuth()
  @Get("auth/admin")
  getAdmin(@Request() req: IRequest) {
    return req.user;
  }

  @Anonymous()
  @Post("register")
  async register(@Response() res: IResponse, @Body() user: UserPostDto) {
    res.redirect(307, "/api/users");
  }
}
