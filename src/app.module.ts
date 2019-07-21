import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./modules/users/users.entity";


@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL || "postgres://postgres:123456@localhost:5432/nestjs_api",
      synchronize: true,
      entities: [User],
  })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
