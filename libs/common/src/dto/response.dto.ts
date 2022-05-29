import { HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../constants/error-codes';

export class ResponseDTO<BodyType> {
  readonly statusCode: HttpStatus;
  readonly message: string[];
  readonly errorCode: ErrorCodes;
  readonly body?: BodyType;

  constructor(
    status: HttpStatus,
    message: string[],
    code: ErrorCodes,
    body?: BodyType,
  ) {
    this.statusCode = status;
    this.message = message;
    this.errorCode = code;
    this.body = body;
  }
}
