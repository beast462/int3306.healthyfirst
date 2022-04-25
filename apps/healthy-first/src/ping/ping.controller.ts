import { ResponseDTO } from '@/common/dto/response.dto';
import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('/api/ping')
export class PingController {
  @Get('/')
  public ping(): ResponseDTO<void> {
    return new ResponseDTO(HttpStatus.OK, []);
  }
}
