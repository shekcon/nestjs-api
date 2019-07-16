import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDescription(): string {
    return 'Nestjs API created by @Shekcon';
  }
}
