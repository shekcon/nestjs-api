import { Controller, Post, Header, Get, Body, Param, Patch, Delete, HttpCode, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./resources/users.model";
import { UserPostDto } from "./resources/dto/users.post";
import { UserPatchDto } from "./resources/dto/user.patch";
import { UserInfo } from "./resources/user.info";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";

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
    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Header("Content-Type", "application/json")
    getAll(): User[] {
        return this.service.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Header("Content-Type", "application/json")
    getById(
        @Param('id') id: number
    ): User {
        return this.service.getById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    @Header("Content-Type", "application/json")
    updateUser(
        @Param('id') id: number,
        @Body() user: UserPatchDto
    ): User {
        return this.service.updateUser(id, user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Header("Content-Type", "application/json")
    deleteUser(
        @Param('id') id: number
    ) {
        this.service.deteleUser(id);
        return { message: "Delete user successfully!" };
    }
}
