import { User } from "../resources/users.model";
import { UserRole } from "../resources/users.role";


export const context = [
    new User(
        1,
        "sang",
        "le",
        "shekcon",
        "shekcon@gmail.com",
        "shekcon",
        UserRole.admin
    ),
    new User(
        2,
        "shekcon",
        "Mr",
        "lsang",
        "sang@gmail.com",
        "sang"
    )
];
