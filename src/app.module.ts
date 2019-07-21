import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      entities: [path.join(__dirname, "**/*.entity{.ts,.js}")]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
