import { Inject } from "@nestjs/common";

export const storePrefixs: string[] = new Array<string>();

export function Logger(prefix: string = "") {
  if (!storePrefixs.includes(prefix)) {
    storePrefixs.push(prefix);
  }
  return Inject(`LoggerService${prefix}`);
}
