import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./modules/database/database.module";
import { TypeOrmImport, CacheImport } from "./app.import";
import { appProviders } from "./app.provider";
import { HeroesModule } from "./modules/heroes/heroes.module";
import { ImagesController } from "./modules/images/images.controller";
import { ImagesModule } from "./modules/images/images.module";

@Module({
  imports: [
    CacheImport,
    AuthModule,
    UsersModule,
    TypeOrmImport,
    DatabaseModule,
    HeroesModule,
    ImagesModule
  ],
  controllers: [AppController, ImagesController],
  providers: [AppService, ...appProviders]
})
export class AppModule {}
