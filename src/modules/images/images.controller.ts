import {
  Controller,
  UploadedFile,
  Post,
  Request,
  Get,
  Param,
  Res,
  UseInterceptors
} from "@nestjs/common";
import { ApiConsumes, ApiImplicitFile, ApiUseTags } from "@nestjs/swagger";
import { IRequest } from "../common/interfaces/request.interface";
import { Authorize } from "../auth/decorators/auth.decorator";
import { Anonymous } from "../auth/decorators/auth.decorator";
import { IResponse } from "../common/interfaces/response.interface";
import { ImagesService } from "./images.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Authorize()
@ApiUseTags("Images")
@Controller("api/images")
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiImplicitFile({
    name: "file",
    required: true,
    description: "Your file"
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: IRequest
  ) {
    return {
      path: `${req.protocol}://${req.headers.host}/api/images/${file.filename}`
    };
  }

  @Get(":fileId")
  @Anonymous()
  async serveFile(@Param("fileId") fileId: string, @Res() res: IResponse) {
    this.imageService.serveStatic(fileId, res);
  }
}
