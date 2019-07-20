import { Controller, Post, Header, Get, Body, Param, Patch, Delete, HttpCode, UseGuards, Request, ForbiddenException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./resources/users.model";
import { UserPostDto } from "./resources/dto/users.post";
import { UserPatchDto } from "./resources/dto/user.patch";
import { UserInfo } from "./resources/users.info";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserRole } from "./resources/users.role";
import { Authorize } from "../auth/guards/authorize.guard";
import { Anonymous } from "../auth/decorators/anonymous.decorator";
import { Claim } from "../auth/decorators/claim.decorator";
import { ClaimGuard } from "../auth/guards/claim.guard";

@UseGuards(Authorize, RolesGuard, ClaimGuard)
@ApiUseTags('Users')
@Controller("api/users")
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Post()
    @Anonymous()
    @Header("Content-Type", "application/json")
    @HttpCode(201)
    addUser(@Body() newUser: UserPostDto): UserInfo {
        return this.service.insertUser(newUser)
    }

    @ApiBearerAuth()
    @Roles(UserRole.admin)
    @Get()
    @Header("Content-Type", "application/json")
    getAll(): User[] {
        return this.service.getAll();
    }

    @Claim()
    @ApiBearerAuth()
    @Get(':id')
    @Header("Content-Type", "application/json")
    getById(
        @Param('id') id: number
    ): User {
        return this.service.getById(id);
    }

    @Claim()
    @ApiBearerAuth()
    @Patch(':id')
    @Header("Content-Type", "application/json")
    updateUser(
        @Param('id') id: number,
        @Body() user: UserPatchDto
    ): User {
        return this.service.updateUser(id, user);
    }

    @Claim()
    @ApiBearerAuth()
    @Delete(':id')
    @Header("Content-Type", "application/json")
    deleteUser(
        @Param('id') id: number
    ) {
        this.service.deteleUser(id);
        return { message: "Delete user successfully!" };
    }
}
