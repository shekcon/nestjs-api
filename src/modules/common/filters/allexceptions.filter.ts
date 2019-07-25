import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { IResponse } from "../interfaces/response.interface";
import { ENOENT } from "constants";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(ex: HttpException | QueryFailedError | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: IResponse = ctx.getResponse();

    // handle conflict typeorm
    const status: HttpStatus =
      ex instanceof QueryFailedError
        ? HttpStatus.CONFLICT
        : ex instanceof HttpException
        ? ex.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status === HttpStatus.CONFLICT) {
      return res.status(status).json({
        statusCode: status,
        error: "Conflict",
        message: ex.detail
      });
    }

    // handle not found image
    if (ex.status === 404)
      return res.status(status).json({
        statusCode: 404,
        error: "Bad Request",
        message: "Image isn't found"
      });
    return res.status(status).json(ex.message);
  }
}
