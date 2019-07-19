import { SetMetadata } from '@nestjs/common';

export const Anonymous = () => SetMetadata('Anonymous', "allowed");