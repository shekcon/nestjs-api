import { Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { User } from "../users/users.entity";
import { UserRole } from "../users/users.role";

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
  async findByUsername(username: string) {
    return await this.manger.query(
      'SELECT * FROM public."Users" WHERE username=$1 AND role!=$2',
      [username, UserRole.admin]
    );
  }
}
