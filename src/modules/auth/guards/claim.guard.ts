import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequest } from '../interfaces/request.interface';
import { TypeAuth } from '../type.decorator';



@Injectable()
export class ClaimGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const claim = this.reflector.get<string[]>(TypeAuth.Claim, context.getHandler());
        if (!claim) {
            return true;
        }
        const request: IRequest = context.switchToHttp().getRequest();
        const user = request.user;
        const hasClaim = (): boolean => request.params.id == user.id;
        return user && user.role && hasClaim();
    }
}