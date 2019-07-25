import { Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: "upload/"
    })
  ],
  providers: [ImagesService]
})
export class ImagesModule {}
