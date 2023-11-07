import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from "@nestjs/common";
import { Logger } from "winston";
import { Observable, tap } from "rxjs";
import { Request, Response } from "express";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject("winston") private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        tap((data) =>
          this.log(
            context.switchToHttp().getRequest(),
            context.switchToHttp().getResponse(),
            data,
          ),
        ),
      );
  }

  private log(req: Request, res: Response, data: object): void {
    const body = { ...req.body };

    delete body.password;
    delete body.passwordConfirmation;
    this.logger.info({
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route.path,
      request: {
        data: {
          body,
          headers: req.headers,
          query: req.query,
          params: req.params,
        },
        from: req.ip,
      },
      response: {
        head: res.getHeaders(),
        body: data,
        status: res.statusCode,
      },
    });
  }
}
