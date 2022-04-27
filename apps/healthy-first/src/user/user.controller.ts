import { CookieEntries } from '@/common/constants/cookie-entries';
import { Cookies } from '@/common/decorators/cookies';
import { ResponseDTO } from '@/common/dto/response.dto';
import { GetQuestionQueryDTO } from '@/common/dto/user/get-question.query.dto';
import { LoginBodyDTO } from '@/common/dto/user/login.body.dto';
import {
  Body,
  Controller,
  Get,
  GoneException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { AnswerValidationErrors, UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/login')
  public async getQuestion(
    @Cookies(CookieEntries.REQUEST_ID) rid: string,
    @Query() { username }: GetQuestionQueryDTO,
  ): Promise<ResponseDTO<string>> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) throw new NotFoundException('Username not found');

    const { question } = await this.userService.generateChallenge(rid, user);

    return new ResponseDTO(HttpStatus.OK, [], question);
  }

  @Post('/login')
  public async login(
    @Cookies(CookieEntries.REQUEST_ID) rid: string,
    @Body() { answer }: LoginBodyDTO,
  ): Promise<ResponseDTO<string>> {
    const validation = this.userService.validateAnswer(rid, answer);

    if (typeof validation === 'string') {
      return new ResponseDTO(HttpStatus.OK, [], validation);
    }

    switch (validation) {
      case AnswerValidationErrors.NOT_FOUND:
        throw new NotFoundException('Challenge not found');

      case AnswerValidationErrors.EXPIRED:
        throw new GoneException('Challenge expired');

      case AnswerValidationErrors.INVALID:
        throw new NotAcceptableException('Invalid or wrong answer');
    }
  }
}
