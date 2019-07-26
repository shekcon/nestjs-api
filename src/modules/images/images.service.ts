import { Injectable } from "@nestjs/common";
import { Logger } from "../logger/logger.decorator";
import { LoggerService } from "../logger/logger.service";
import { IResponse } from "../common/interfaces/response.interface";

@Injectable()
export class ImagesService {
  constructor(
    @Logger("ImageService")
    private readonly logger: LoggerService
  ) {}

  serveStatic(file: string, res: IResponse) {
    this.logger.log("serve static image ...");
    res.sendFile(file, { root: "uploads" }, (err: any) => {
      if (err) {
        this.logger.log(err);
        res
          .status(404)
          .json({
            status: 404,
            error: "Bad Request",
            message: "Image isn't found"
          })
          .end();
      }
    });
  }
}
