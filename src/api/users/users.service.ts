import { Injectable, NotImplementedException, NotFoundException } from "@nestjs/common";
import { User } from "./users.model";

@Injectable()
export class UserService {

    private users: User[] = [];

    private findUser(id: string): { user: User, i: number } {
        const i = this.users.findIndex((user) => user.id === id);
        const user = this.users[i];
        if (!user) {
            throw new NotFoundException("Could not find user");
        }
        return {
            user: user,
            i: i
        }
    }

    insertUser(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string
    ): User {
        const newUser = new User(
            Math.random().toString(),
            firstname,
            lastname,
            username,
            email,
            password
        )
        this.users.push(newUser);
        return newUser;
    }

    getAll(): User[] {
        return [...this.users];
    }

    getById(id: string): User {
        const user = this.findUser(id).user;
        return user;
    }

    updateUser(
        id: string,
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string
    ): User {
        const { user, i } = this.findUser(id);
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        this.users[i] = user;
        return user;
    }

    deteleUser(id: string) {
        const index = this.findUser(id).i;
        this.users.splice(index, 1);
    }

} 