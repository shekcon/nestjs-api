import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Hero } from "./hero.entity";
import { HeroesService } from "./heroes.service";
import { HeroesController } from "./heroes.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Hero])],
  controllers: [HeroesController],
  providers: [HeroesService]
})
export class HeroesModule {}
