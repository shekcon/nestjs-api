import { SetMetadata } from '@nestjs/common';
import { TypeAuth } from '../type.decorator';

export const Anonymous = () => SetMetadata(TypeAuth.Anonymous, "allowed");