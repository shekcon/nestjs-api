import { Controller, Post, Header, Get, Body, Param, Patch, Delete, HttpCode, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./resources/users.model";
import { UserPostDto } from "./resources/dto/users.post";
import { UserPatchDto } from "./resources/dto/user.patch";
import { UserInfo } from "./resources/users.info";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { UserRole } from "./resources/users.role";
import { Authorize } from "../auth/auth.guard";


@ApiUseTags('Users')
@Controller("api/users")
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Post()
    @Header("Content-Type", "application/json")
    @HttpCode(201)
    addUser(@Body() newUser: UserPostDto): UserInfo {
        return this.service.insertUser(newUser)
    }

    @ApiBearerAuth()
    @UseGuards(Authorize, RolesGuard)
    @Roles(UserRole.admin)
    @Get()
    @Header("Content-Type", "application/json")
    getAll(): User[] {
        return this.service.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(Authorize)
    @Get(':id')
    @Header("Content-Type", "application/json")
    getById(
        @Param('id') id: number
    ): User {
        return this.service.getById(id);
    }

    @ApiBearerAuth()
    @UseGuards(Authorize)
    @Patch(':id')
    @Header("Content-Type", "application/json")
    updateUser(
        @Param('id') id: number,
        @Body() user: UserPatchDto
    ): User {
        return this.service.updateUser(id, user);
    }

    @ApiBearerAuth()
    @UseGuards(Authorize)
    @Delete(':id')
    @Header("Content-Type", "application/json")
    deleteUser(
        @Param('id') id: number
    ) {
        this.service.deteleUser(id);
        return { message: "Delete user successfully!" };
    }
}
