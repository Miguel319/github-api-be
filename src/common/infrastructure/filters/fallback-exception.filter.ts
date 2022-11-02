import { ILoggerService, ILoggerServiceName } from "@/common/domain/logger";
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Inject,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { getI18nContextFromArgumentsHost } from "nestjs-i18n";

@Catch()
export class FallbackExpectionFilter implements ExceptionFilter {
  constructor(
    @Inject(ILoggerServiceName) private readonly _loggerService: ILoggerService,
  ) {}

  catch(exception: { message: string }, host: ArgumentsHost) {
    this._loggerService.error(
      "Exception Filter",
      `fallback exception handler triggered. Exception = ${exception.message}`,
    );

    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    const BAD_REQUEST: HttpStatus = HttpStatus.BAD_REQUEST;

    const i18n = getI18nContextFromArgumentsHost(host);

    return response.status(BAD_REQUEST).json({
      success: false,
      statusCode: BAD_REQUEST,
      message: exception.message
        ? exception.message
        : i18n.t("http.unexpectedError"),
    });
  }
}
