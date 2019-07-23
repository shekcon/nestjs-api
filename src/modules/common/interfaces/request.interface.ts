import { Request } from "express";
import { IUser } from "../../users/interfaces/users.interface";
import { IToken } from "../../auth/interfaces/token.interface";

export interface IRequest extends Request {
  user?: IUser | IToken;
}
