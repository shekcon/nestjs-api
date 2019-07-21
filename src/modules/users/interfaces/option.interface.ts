import { UserRole } from "../users.role";

export interface UserOption {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: UserRole;
}
