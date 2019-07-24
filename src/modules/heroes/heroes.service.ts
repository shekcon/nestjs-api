import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Hero } from "./hero.entity";

@Injectable()
export class HeroesService extends TypeOrmCrudService<Hero> {
  constructor(@InjectRepository(Hero) repo) {
    super(repo);
  }
  async create(hero: Hero): Promise<Hero> {
    const newHero = new Hero();
    newHero.name = hero.name;
    newHero.power = hero.power;
    return await this.repo.save(newHero);
  }

  async findSingle(id: number): Promise<Hero> {
    return await this.repo.findOne({ id: id });
  }

  async getAll(): Promise<Hero[]> {
    return await this.repo.find();
  }
}
