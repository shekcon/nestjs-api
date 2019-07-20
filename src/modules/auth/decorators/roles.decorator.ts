import { SetMetadata } from '@nestjs/common';
import { TypeAuth } from '../type.decorator';

export const Roles = (...roles: string[]) => SetMetadata(TypeAuth.Roles, roles);