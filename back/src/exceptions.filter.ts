import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  LoggerService,
} from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { Response } from "express";

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus() ?? HttpStatusCode.InternalServerError;
    response.status(status).json({
      statusCode: status,
      message: this.getMessage(exception),
    });
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const resp = exception.getResponse();
      if (resp instanceof Object && resp["message"]) return resp["message"];
      return exception.message;
    }
    return "Internal server error";
  }
}
