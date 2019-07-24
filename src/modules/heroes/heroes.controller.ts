import {
  Controller,
  UseGuards,
  UseFilters,
  UseInterceptors,
  Body,
  Param
} from "@nestjs/common";
import { Crud, Override } from "@nestjsx/crud";
import { Hero } from "./hero.entity";
import { HeroesService } from "./heroes.service";
import { ApiUseTags, ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../users/users.role";
import { Authorize } from "../auth/guards/authorize.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ClaimGuard } from "../auth/guards/claim.guard";
import { Anonymous } from "../auth/decorators/anonymous.decorator";
import { Claim } from "../auth/decorators/claim.decorator";

@UseInterceptors()
@UseFilters()
@UseGuards(Authorize, RolesGuard, ClaimGuard)
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
