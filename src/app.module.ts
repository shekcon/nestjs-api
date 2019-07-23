import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/users/users.entity";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./modules/common/filters/allexceptions.filter";
import { DATABASE_URL, DATABASE_TYPE } from "./modules/common/config";

@Module({
  imports: [
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
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
