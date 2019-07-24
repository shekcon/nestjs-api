import { APP_INTERCEPTOR } from "@nestjs/core";
import { CacheInterceptor } from "@nestjs/common";

export const appProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }
];
