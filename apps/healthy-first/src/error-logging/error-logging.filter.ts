import { DbLoggerService } from '@/db-logger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

@Catch()
export class ErrorLoggingFilter implements ExceptionFilter {
  public constructor(private readonly dbLoggerService: DbLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception.getStatus() < HttpStatus.INTERNAL_SERVER_ERROR) return;

    const http = host.switchToHttp();
    const request = http.getRequest<Request>();

    const errorDetail = `Message: ${exception.message}
StatusCode: ${exception.getStatus()}
RequestedPath: ${request.url}
RequestedQuery: ${JSON.stringify(request.query, null, 2)}
RequestedBody: ${JSON.stringify(request.body, null, 2)}
`;

    this.dbLoggerService.error(
      'Severe exception was caught unhandled',
      errorDetail,
      exception.stack,
      'ErrorLoggingFilter',
    );
  }
}
