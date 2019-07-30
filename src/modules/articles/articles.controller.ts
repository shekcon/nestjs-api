import { Controller, Post, Body, Request, Get, Param } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { Authorize } from "../auth/decorators/auth.decorator";
import { IRequest } from "../common/interfaces/request.interface";
import { Article } from "./articles.enity";

@Authorize()
@Controller("articles")
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  async create(
    @Request() res: IRequest,
    @Body() param: Article
  ): Promise<Article> {
    return await this.service.save(param, res.user.id);
  }

  @Get(":id")
  async findOne(
    @Request() res: IRequest,
    @Param("id") id: number
  ): Promise<Article> {
    return await this.service.findOne(id);
  }
}
