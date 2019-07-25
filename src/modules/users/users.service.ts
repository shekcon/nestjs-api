import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { User } from "./users.entity";
import { UserResponse } from "./interfaces/response.interface";
import { PasswordService } from "../common/services/password.service";
import { Repository } from "typeorm";
import { UserOption } from "./interfaces/option.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { IUser } from "./interfaces/users.interface";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly pwdService: PasswordService,
    private readonly databaseService: DatabaseService
  ) {}

  async create(user: IUser): Promise<UserResponse> {
    const newUser = new User();
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.pwdhash = this.pwdService.hash(user.password);
    newUser.role = user.role;

    const _user = await this.userRepository.save(newUser);
    const { pwdhash, ...info } = _user;
    return info;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(option: UserOption, isthrowEx: boolean = true): Promise<User> {
    const user = await this.userRepository.findOne(option);
    if (!user && isthrowEx) {
      throw new NotFoundException("User isn't found");
    }
    return user;
  }

  async update(userDto: IUser, option: UserOption): Promise<User> {
    const user = await this.userRepository.findOne(option);
    if (!user) {
      throw new NotFoundException("User isn't found");
    }
    user.firstname = userDto.firstname || user.firstname;
    user.lastname = userDto.lastname || user.lastname;
    user.username = userDto.username || user.username;
    user.email = userDto.email || user.email;
    user.pwdhash = userDto.password
      ? this.pwdService.hash(userDto.password)
      : user.pwdhash;
    this.userRepository.save(user);
    return user;
  }

  async detele(option: UserOption) {
    const user = await this.userRepository.findOne(option);
    if (!user) {
      throw new NotFoundException("User isn't found");
    }
    this.userRepository.remove(user);
  }

  async runRawQuery(username: string) {
    const user = await this.databaseService.findByUsername(username);
    if(user){
      throw new BadRequestException("User isn't found")
    }
    return user;
  }
}
