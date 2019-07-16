import { Controller, Post, Header, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "./users.model";

@Controller("users")
export class UsersController {
    constructor(private readonly service: UserService) { }

    @Post()
    @Header("Content-Type", "application/json")
    addUser(
        @Body("firstname") firstname: string,
        @Body("lastname") lastname: string,
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string
    ): User {
        return this.service.insertUser(
            firstname,
            lastname,
            username,
            email,
            password
        )
    }

    @Get()
    @Header("Content-Type", "application/json")
    getAll(): User[] {
        return this.service.getAll();
    }

    @Get(':id')
    @Header("Content-Type", "application/json")
    getById(
        @Param('id') id: string
    ): User {
        return this.service.getById(id);
    }

    @Patch(':id')
    @Header("Content-Type", "application/json")
    updateUser(
        @Param('id') id: string,
        @Body("firstname") firstname: string,
        @Body("lastname") lastname: string,
        @Body("username") username: string,
        @Body("email") email: string,
        @Body("password") password: string
    ): User {
        return this.service.updateUser(
            id,
            firstname,
            lastname,
            username,
            email,
            password
        );
    }

    @Delete(':id')
    deleteUser(
        @Param('id') id: string
    ): { message: string } {
        this.service.deteleUser(id);
        return { message: "Delete user successfully!" };
    }
}
