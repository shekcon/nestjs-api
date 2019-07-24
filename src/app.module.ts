import { Module, CacheInterceptor, CacheModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/users/users.entity";
import { DATABASE_URL, DATABASE_TYPE } from "./modules/common/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { DatabaseService } from "./modules/database/database.service";
import { DatabaseModule } from "./modules/database/database.module";

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // seconds
      max: 10 // maximum number of items in cache
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE,
      // We need add the extra SSL to use heroku on localhost
      extra: {
        ssl: true
      },
      url: DATABASE_URL,
      synchronize: true,
      entities: [User]
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    DatabaseService
  ]
})
export class AppModule {}
