import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { LoggerModule } from "../logger/logger.module";
import { ImagesController } from "./images.controller";
import { MulterImport } from "./images.import";

@Module({
  imports: [MulterImport, LoggerModule.forRoot()],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
