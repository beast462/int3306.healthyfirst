import { ErrorCodes } from '@/common/constants/error-codes';
import { DbLoggerService } from '@/db-logger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorLoggingFilter implements ExceptionFilter {
  private readonly logger: Logger;
  public constructor(private readonly dbLoggerService: DbLoggerService) {
    this.logger = new Logger('ErrorLoggingFilter');
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    if (!(exception instanceof HttpException)) {
      this.logger.error('Unexpected error', (exception as Error).stack);

      this.dbLoggerService.fatal(
        'Unhandled exception',
        (exception as Error).message,
        (exception as Error).stack,
        'ErrorLoggingFilter',
      );

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode: ErrorCodes.UNKNOWN_ERROR,
        message: ['Internal server error'],
        error: 'Unknown fatal error',
      });
      return;
    }

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
