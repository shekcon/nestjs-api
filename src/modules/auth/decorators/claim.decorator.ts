import { SetMetadata } from '@nestjs/common';
import { TypeAuth } from '../type.decorator';

export const Claim = () => SetMetadata(TypeAuth.Claim, "owner");