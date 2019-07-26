import { Injectable, Scope } from "@nestjs/common";

@Injectable({
  scope: Scope.TRANSIENT
})
export class LoggerService {
  private prefix: string = "Logger";

  log(message: string) {
    console.log(`[${this.prefix}] ${message}`);
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}
