import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Request,
  Get,
  Param,
  Res,
  UseGuards
} from "@nestjs/common";
import { ApiConsumes, ApiImplicitFile, ApiUseTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { IRequest } from "../common/interfaces/request.interface";
import { Authorize } from "../auth/guards/authorize.guard";
import { Anonymous } from "../auth/decorators/auth.decorator";

@UseGuards(Authorize)
@ApiUseTags("Images")
@Controller("api/images")
export class ImagesController {
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: `uploads/`,
        filename: (req, file, cb) => {
          return cb(null, `${new Date().toISOString()}${extname(file.originalname)}`);
        }
      })
    })
  )
  @ApiConsumes("multipart/form-data")
  @Anonymous()
  @ApiImplicitFile({
    name: "file",
    required: true,
    description: "Your file"
  })
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: IRequest) {
    return {
        path: `${req.protocol}://${req.headers.host}/api/images/${file.filename}`
    }
  }

  @Get(':fileId')
  async serveAvatar(@Param('fileId') fileId: string, @Res() res: any): Promise<any> {
    res.sendFile(fileId, { root: 'uploads'});
  }
}
