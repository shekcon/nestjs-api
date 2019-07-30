import { Injectable } from "@nestjs/common";
import { Article } from "./articles.enity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly respository: Repository<Article>,
    private readonly userService: UsersService
  ) {}
  async save(param: Article, id: number): Promise<Article> {
    const user = await this.userService.findOne({ id: id });
    param.user = user;
    return await this.respository.save(param);
  }
  async findOne(id: number): Promise<Article> {
    return await this.respository.findOne({ id: id });
  }
}
