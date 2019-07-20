import { Request } from 'express';
import { IToken } from './token.interface';

export declare interface IRequest extends Request {
    user: IToken
}