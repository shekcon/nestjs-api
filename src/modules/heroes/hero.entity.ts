import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsOptional, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { CrudValidationGroups } from "@nestjsx/crud";

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({ name: "Heroes" })
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column()
  name: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  power: number;
}
