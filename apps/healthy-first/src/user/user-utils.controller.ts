import { Response } from 'express';

import { CookieEntries } from '@/common/constants/cookie-entries';
import { Environments } from '@/common/constants/environments';
import { ErrorCodes } from '@/common/constants/error-codes';
import { Cookies } from '@/common/decorators/cookies';
import { CurrentUser } from '@/common/decorators/current-user';
import { ResponseDTO } from '@/common/dto/response.dto';
import { GetQuestionQueryDTO } from '@/common/dto/user-utils/get-question.query.dto';
import { GetQuestionResDto } from '@/common/dto/user-utils/get-question.res.dto';
import { LoginBodyDTO } from '@/common/dto/user-utils/login.body.dto';
import { UserEntity } from '@/common/entities';
import { createError } from '@/common/helpers/create-error';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  NotImplementedException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKeys } from '../base/config.module';
import { AnswerValidationErrors, UserUtilsService } from './user-utils.service';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserUtilsController {
  public constructor(
    private readonly userService: UserService,
    private readonly userUtilsService: UserUtilsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/login')
  public async getQuestion(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) res: Response,
    @Query() { username }: GetQuestionQueryDTO,
  ): Promise<ResponseDTO<GetQuestionResDto>> {
    if (currentUser)
      createError(ForbiddenException, ErrorCodes.ALREADY_LOGGED_IN);

    const user = await this.userService.getUserByUsername(username);

    if (!user)
      createError(NotFoundException, ErrorCodes.USERNAME_DOES_NOT_EXIST);

    const { question, questionCheck, questionCheckBody } =
      await this.userUtilsService.generateChallenge(user);

    res.cookie(CookieEntries.QUESTION_CHECK, questionCheck, {
      httpOnly: true,
      signed:
        this.configService.get<Environments>(ConfigKeys.ENVIRONMENT) ===
        Environments.PRODUCTION,
      expires: new Date(questionCheckBody.exp),
      sameSite: 'strict',
    });

    return new ResponseDTO(HttpStatus.OK, [], ErrorCodes.SUCCESS, {
      question,
      displayName: user.displayName,
      role: user.role.name,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  public async login(
    @CurrentUser() currentUser: UserEntity,
    @Cookies(CookieEntries.QUESTION_CHECK) questionCheck: string,
    @Res({ passthrough: true }) res: Response,
    @Body() { answer }: LoginBodyDTO,
  ): Promise<ResponseDTO<void>> {
    if (currentUser)
      createError(ForbiddenException, ErrorCodes.ALREADY_LOGGED_IN);

    if (!questionCheck)
      createError(BadRequestException, ErrorCodes.QUESTION_CHECK_MISSING);

    const validation = await this.userUtilsService.validateAnswer(
      questionCheck,
      answer,
    );

    if (typeof validation === 'string') {
      res.cookie(CookieEntries.AUTH_TOKEN, validation, {
        httpOnly: true,
        signed:
          this.configService.get<Environments>(ConfigKeys.ENVIRONMENT) ===
          Environments.PRODUCTION,
        expires: new Date(
          Date.now() +
            this.configService.get<number>(ConfigKeys.AUTH_TOKEN_EXP),
        ),
        sameSite: 'strict',
      });

      res.clearCookie(CookieEntries.QUESTION_CHECK);

      return new ResponseDTO(HttpStatus.OK, [], ErrorCodes.SUCCESS);
    }

    switch (validation) {
      case AnswerValidationErrors.NOT_DECODABLE:
        createError(
          BadRequestException,
          ErrorCodes.QUESTION_CHECK_CAN_NOT_BE_DECODED,
        );

      case AnswerValidationErrors.NOT_VERIFIABLE:
        createError(
          BadRequestException,
          ErrorCodes.QUESTION_CHECK_WRONG_SIGNATURE,
        );

      case AnswerValidationErrors.USER_NOT_FOUND:
        createError(NotFoundException, ErrorCodes.USER_DOES_NOT_EXIST);

      case AnswerValidationErrors.EXPIRED:
        createError(BadRequestException, ErrorCodes.QUESTION_CHECK_EXPIRED);

      case AnswerValidationErrors.WRONG:
        createError(BadRequestException, ErrorCodes.ANSWER_IS_INCORRECT);

      default:
        createError(NotImplementedException, ErrorCodes.UNKNOWN_ERROR);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  public async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseDTO<void>> {
    res.clearCookie(CookieEntries.AUTH_TOKEN);

    return new ResponseDTO(HttpStatus.OK, [], ErrorCodes.SUCCESS);
  }
}
