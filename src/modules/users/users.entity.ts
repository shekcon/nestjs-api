import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn
} from "typeorm";
import { UserRole } from "./users.role";
import { Article } from "../articles/articles.enity";

@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 50 })
  firstname: string;

  @Column("varchar", { length: 50 })
  lastname: string;

  @Column("varchar", { length: 255, unique: true })
  username: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text")
  pwdhash: string;

  @Column({ length: 50, default: UserRole.user })
  role: string;

  @OneToMany(type => Article, article => article.user)
  @JoinColumn()
  articles: Article[];
}
