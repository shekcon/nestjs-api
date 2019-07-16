import { UserRole } from "./users.role";


export class UserInfo {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public username: string,
        public email: string,
        public role: number = UserRole.user
    ) { }
}