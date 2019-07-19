import { Controller, Post, Header, Get, Body, Param, Patch, Delete, HttpCode, UseGuards, Request, ForbiddenException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./resources/users.model";
import { UserPostDto } from "./resources/dto/users.post";
import { UserPatchDto } from "./resources/dto/user.patch";
import { UserInfo } from "./resources/users.info";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { UserRole } from "./resources/users.role";
import { Authorize } from "../auth/authorize/auth.guard";
import { Anonymous } from "../auth/authorize/auth.decorator";

@UseGuards(Authorize, RolesGuard)
@ApiUseTags('Users')
@Controller("api/users")
export class UsersController {
    constructor(private readonly service: UsersService) { }

    private checkPermission(id: number, user: any){
        if (id == user.id && user.role != UserRole.admin){
            throw new ForbiddenException();
        }
    }
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

    @ApiBearerAuth()
    @Get(':id')
    @Header("Content-Type", "application/json")
    getById(
        @Param('id') id: number,
        @Request() req: any
    ): User {
        this.checkPermission(id, req.user);
        return this.service.getById(id);
    }

    @ApiBearerAuth()
    @Patch(':id')
    @Header("Content-Type", "application/json")
    updateUser(
        @Param('id') id: number,
        @Body() user: UserPatchDto,
        @Request() req: any
    ): User {
        this.checkPermission(id, req.user);
        return this.service.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Header("Content-Type", "application/json")
    deleteUser(
        @Param('id') id: number,
        @Request() req: any
    ) {
        this.checkPermission(id, req.user);
        this.service.deteleUser(id);
        return { message: "Delete user successfully!" };
    }
}
