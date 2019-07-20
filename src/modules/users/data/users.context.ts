import { User } from "../resources/users.model";
import { UserRole } from "../resources/users.role";


export const context = [
    new User(
        1,
        "sang",
        "le",
        "shekcon",
        "shekcon@gmail.com",
        "123456789",
        UserRole.admin
    ),
    new User(
        2,
        "shekcon",
        "Mr",
        "lsang",
        "sang@gmail.com",
        "123456789"
    ),
    new User(
        3,
        "shekcon",
        "Mr",
        "lsang1",
        "example@gmail.com",
        "123456789"
    )
];
