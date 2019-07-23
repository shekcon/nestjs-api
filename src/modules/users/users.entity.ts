import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./users.role";

@Entity({name: "Users"})
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
}
