import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { Crud, Override } from "@nestjsx/crud";
import { Hero } from "./hero.entity";
import { HeroesService } from "./heroes.service";
import { ApiUseTags, ApiBearerAuth } from "@nestjs/swagger";
import { UserRole } from "../users/users.role";
import { Authorize } from "../auth/decorators/auth.decorator";
import { Anonymous, Roles, Claim } from "../auth/decorators/auth.decorator";

@UseInterceptors()
@UseFilters()
@Authorize()
@ApiUseTags("Heroes")
@Crud({
  model: {
    type: Hero
  },
  routes: {
    exclude: ["createManyBase"],
    getManyBase: {
      decorators: [Roles(UserRole.admin), ApiBearerAuth()]
    },
    getOneBase: {
      decorators: [Claim(), ApiBearerAuth()]
    },
    createOneBase: {
      decorators: [Anonymous()]
    },
    updateOneBase: {
      decorators: [Claim(), ApiBearerAuth()]
    },
    replaceOneBase: {
      decorators: [Claim(), ApiBearerAuth()]
    },
    deleteOneBase: {
      decorators: [Claim(), ApiBearerAuth()],
      returnDeleted: true
    }
  }
})
@Controller("api/heroes")
export class HeroesController {
  constructor(public service: HeroesService) {}

  // @Override("createOneBase")
  // createHero(@Body() hero: Hero) {
  //   return this.service.create(hero);
  // }
  // @Override("getManyBase")
  // getAll() {
  //   return this.service.getAll();
  // }
  // @Override("getOneBase")
  // findSingle(@Param("id") id: number) {
  //   return this.service.findSingle(id);
  // }
}
