import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "../users/users.entity";

@Injectable()
export class DatabaseService {
  constructor(
    @InjectEntityManager()
    private readonly manger: EntityManager
  ) {}

  async getAll(): Promise<User[]> {
    return await this.manger
      .createQueryBuilder()
      .select()
      .from(User, "user")
      .execute();
  }
  async runRawQuery() {
    return await this.manger.query(
      'SELECT * FROM public."Users" WHERE username=$1',
      ["shekcon"]
    );
  }
}
