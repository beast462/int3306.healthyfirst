import { DbLoggerService } from '@/db-logger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorLoggingFilter implements ExceptionFilter {
  public constructor(private readonly dbLoggerService: DbLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const statusCode = exception.getStatus();

    if (statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
      response.status(statusCode).json(exception.getResponse());
      return;
    }

    const errorDetail = `Message: ${exception.message}
StatusCode: ${statusCode}
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

    response.status(statusCode).json(exception.getResponse());
  }
}
