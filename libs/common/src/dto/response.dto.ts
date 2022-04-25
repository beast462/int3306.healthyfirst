import { HttpStatus } from '@nestjs/common';

export class ResponseDTO<BodyType> {
  status: HttpStatus;
  messages: string[];
  body?: BodyType;

  constructor(status: HttpStatus, messages: string[], body?: BodyType) {
    this.status = status;
    this.messages = messages;
    this.body = body;
  }
}
