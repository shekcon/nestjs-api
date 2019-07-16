import { Injectable, NotImplementedException, NotFoundException } from "@nestjs/common";
import { User } from "./resources/users.model";
import { context } from "./data/users.context";
import { UserPostDto } from "./resources/dto/users.post";
import { UserPatchDto } from "./resources/dto/user.patch";
import { UserInfo } from "./resources/user.info";

@Injectable()
export class UsersService {

    private users: User[] = context;

    private findUser(id: number): { user: User, i: number } {
        const index = this.users.findIndex((user) => user.id == id);
        const user = this.users[index];
        if (!user) {
            throw new NotFoundException("Could not find user");
        }
        return {
            user: user,
            i: index
        }
    }

    insertUser(user: UserPostDto): UserInfo {
        const id = this.users[this.users.length-1].id + 1;
        const newUser = new User(
            id,
            user.firstname,
            user.lastname,
            user.username,
            user.email,
            user.password
        )
        this.users.push(newUser);
        const {password, ...info} = newUser;
        const userInfo = {id, ...info};
        return userInfo;
    }

    getAll(): User[] {
        return [...this.users];
    }

    getById(id: number): User {
        const user = this.findUser(id).user;
        return user;
    }

    getByUsername(username: string): User {
        const user = this.users.find((user) => user.username === username);
        return user;
    }

    updateUser(id: number, userDto: UserPatchDto
    ): User {
        const { user, i } = this.findUser(id);
        user.firstname = userDto.firstname || user.firstname;
        user.lastname = userDto.lastname || user.lastname;
        user.username = userDto.username || user.username;
        user.email = userDto.email || user.email;
        user.password = userDto.password || user.password;
        this.users[i] = user;
        return user;
    }

    deteleUser(id: number) {
        const index = this.findUser(id).i;
        this.users.splice(index, 1);
    }

} 