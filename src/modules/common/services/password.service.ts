import { Injectable } from "@nestjs/common";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";

@Injectable()
export class PasswordService {
  hash(pwd: string): string {
    const salt: string = genSaltSync(10);
    return hashSync(pwd, salt);
  }

  verify(pwd: string, pwdhash: string): boolean {
    return compareSync(pwd, pwdhash);
  }
}
