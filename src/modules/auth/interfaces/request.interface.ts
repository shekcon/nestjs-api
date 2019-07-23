import { Request } from "express";
import { IToken } from "./token.interface";

export interface IAuthRequest extends Request {
  user: IToken;
}
