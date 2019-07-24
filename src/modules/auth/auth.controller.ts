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
import { Authorize } from "./guards/authorize.guard";
import { IResponse } from "../common/interfaces/response.interface";
import { RolesGuard } from "./guards/roles.guard";
import { IRequest } from "../common/interfaces/request.interface";
import { UserPostDto } from "../users/dto/users.post";
import { UserRole } from "../users/users.role";
import { AuthLogin } from "./dto/auth.login";
import { Roles } from "./decorators/auth.decorator";

@UseInterceptors()
@UseFilters()
@ApiUseTags("Auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Request() req: IRequest, @Body() user: AuthLogin) {
    return this.authService.login(req.user);
  }

  @UseGuards(Authorize, RolesGuard)
  @Roles(UserRole.admin)
  @ApiBearerAuth()
  @Get("auth/user")
  getUser(@Request() req: IRequest) {
    return req.user;
  }

  @UseGuards(Authorize)
  @ApiBearerAuth()
  @Get("auth/admin")
  getAdmin(@Request() req: IRequest) {
    return req.user;
  }

  @Post("register")
  async register(@Response() res: IResponse, @Body() user: UserPostDto) {
    res.redirect(307, "/api/users");
  }
}
