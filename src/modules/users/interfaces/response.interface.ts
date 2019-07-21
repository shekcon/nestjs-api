import { UserRole } from "../users.role";

export interface UserResponse {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
}
