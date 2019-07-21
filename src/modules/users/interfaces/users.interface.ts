import { UserRole } from "../users.role";

export interface IUser {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: UserRole;
  password?: string;
}
