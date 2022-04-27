import { HttpStatus } from '@nestjs/common';

export class ResponseDTO<BodyType> {
  status: HttpStatus;
  message: string[];
  body?: BodyType;

  constructor(status: HttpStatus, message: string[], body?: BodyType) {
    this.status = status;
    this.message = message;
    this.body = body;
  }
}
