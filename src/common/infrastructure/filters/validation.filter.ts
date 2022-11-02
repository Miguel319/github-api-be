import { ValidationException } from "@/common/domain/exceptions";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();

    const BAD_REQUEST: HttpStatus = HttpStatus.BAD_REQUEST;

    const errorMessage: string = exception.validationErrors.join(" ");

    return res.status(BAD_REQUEST).send({
      success: false,
      statusCode: BAD_REQUEST,
      message: errorMessage,
    });
  }
}
