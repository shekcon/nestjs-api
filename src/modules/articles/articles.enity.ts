import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Exclusion } from "typeorm";
import { User } from "../users/users.entity";

@Entity({name: "Articles"})
export class Article{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    title: string;

    @Column({length: 100})
    description: string;

    @Column()
    body: string;

    @ManyToOne(type => User, user => user.articles)
    user: User
}