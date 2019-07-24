import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./modules/database/database.module";
import { TypeOrmImport, CacheImport } from "./app.import";
import { appProviders } from "./app.provider";
import { HeroesModule } from "./modules/heroes/heroes.module";

@Module({
  imports: [
    CacheImport,
    AuthModule,
    UsersModule,
    TypeOrmImport,
    DatabaseModule,
    HeroesModule
  ],
  controllers: [AppController],
  providers: [AppService, ...appProviders]
})
export class AppModule {}
