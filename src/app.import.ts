import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/common";

import { DATABASE_TYPE, DATABASE_URL } from "./modules/common/config";
import { User } from "./modules/users/users.entity";
import { Hero } from "./modules/heroes/hero.entity";
import { Article } from "./modules/articles/articles.enity";

export const TypeOrmImport = TypeOrmModule.forRoot({
  type: DATABASE_TYPE,
  // We need add the extra SSL to use heroku on localhost
  extra: {
    ssl: true
  },
  url: DATABASE_URL,
  synchronize: true,
  entities: [User, Hero, Article]
});

export const CacheImport = CacheModule.register({
  ttl: 60, // seconds
  max: 10 // maximum number of items in cache
});
