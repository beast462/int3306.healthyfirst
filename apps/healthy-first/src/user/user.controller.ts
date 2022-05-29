import { Response } from 'express';

import { CookieEntries } from '@/common/constants/cookie-entries';
import { Environments } from '@/common/constants/environments';
import { Cookies } from '@/common/decorators/cookies';
import { CurrentUser } from '@/common/decorators/current-user';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CreateUserBodyDTO } from '@/common/dto/user/create-user.body.dto';
import { GetQuestionQueryDTO } from '@/common/dto/user/get-question.query.dto';
import { GetQuestionResDto } from '@/common/dto/user/get-question.res.dto';
import { GetUserParamDTO } from '@/common/dto/user/get-user.param.dto';
import { LoginBodyDTO } from '@/common/dto/user/login.body.dto';
import { UserEntity } from '@/common/entities';
import { HttpErrorMessages } from '@/common/messages/http-error';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  NotImplementedException,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKeys } from '../base/config.module';
import { RoleService } from './role.service';
import {
  AnswerValidationErrors,
  CreateUserErrors,
  UserService,
} from './user.service';

const createUserErrorMessages: Record<CreateUserErrors, string[]> = {
  [CreateUserErrors.USERNAME_EXISTS]: HttpErrorMessages.USERNAME_EXISTS,
  [CreateUserErrors.EMAIL_EXISTS]: HttpErrorMessages.EMAIL_EXISTS,
  [CreateUserErrors.BOTH]: HttpErrorMessages.USERNAME_AND_EMAIL_EXISTS,
};

@Controller('/api/user')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/login')
  public async getQuestion(
    @CurrentUser() currentUser: UserEntity,
    @Res({ passthrough: true }) res: Response,
    @Query() { username }: GetQuestionQueryDTO,
  ): Promise<ResponseDTO<GetQuestionResDto>> {
    if (currentUser)
      throw new ForbiddenException(HttpErrorMessages.ALREADY_LOGGED_IN);

    const user = await this.userService.getUserByUsername(username);

    if (!user)
      throw new NotFoundException(HttpErrorMessages.USERNAME_DOES_NOT_EXIST);

    const { question, questionCheck, questionCheckBody } =
      await this.userService.generateChallenge(user);

    res.cookie(CookieEntries.QUESTION_CHECK, questionCheck, {
      httpOnly: true,
      signed:
        this.configService.get<Environments>(ConfigKeys.ENVIRONMENT) ===
        Environments.PRODUCTION,
      expires: new Date(questionCheckBody.exp),
      sameSite: 'strict',
    });

    return new ResponseDTO(HttpStatus.OK, [], {
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
      throw new ForbiddenException(HttpErrorMessages.ALREADY_LOGGED_IN);

    if (!questionCheck)
      throw new BadRequestException(HttpErrorMessages.QUESTION_CHECK_MISSING);

    const validation = await this.userService.validateAnswer(
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

      return new ResponseDTO(HttpStatus.OK, []);
    }

    switch (validation) {
      case AnswerValidationErrors.NOT_DECODABLE:
        throw new BadRequestException(
          HttpErrorMessages.QUESTION_CHECK_CAN_NOT_BE_DECODED,
        );

      case AnswerValidationErrors.NOT_VERIFIABLE:
        throw new BadRequestException(
          HttpErrorMessages.QUESTION_CHECK_WRONG_SIGNATURE,
        );

      case AnswerValidationErrors.USER_NOT_FOUND:
        throw new NotFoundException(HttpErrorMessages.USER_DOES_NOT_EXIST);

      case AnswerValidationErrors.EXPIRED:
        throw new BadRequestException(HttpErrorMessages.QUESTION_CHECK_EXPIRED);

      case AnswerValidationErrors.WRONG:
        throw new BadRequestException(HttpErrorMessages.ANSWER_IS_INCORRECT);

      default:
        throw new NotImplementedException(HttpErrorMessages.$_UNKNOWN_ERROR);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  public async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseDTO<void>> {
    res.clearCookie(CookieEntries.AUTH_TOKEN);

    return new ResponseDTO(HttpStatus.OK, []);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  public async getUser(
    @Param() { userId: _userId }: GetUserParamDTO,
    @CurrentUser() user: UserEntity,
  ): Promise<ResponseDTO<UserEntity>> {
    if (_userId === 'me') return new ResponseDTO(HttpStatus.OK, [], user);

    if (_userId.match(/\D/))
      throw new BadRequestException(HttpErrorMessages.USERID_INVALID);

    const userId = parseInt(_userId, 10);

    return new ResponseDTO(
      HttpStatus.OK,
      [],
      await this.userService.getUserById(userId),
    );
  }

  @Post()
  public async createUser(
    @CurrentUser() user: UserEntity,
    @Body()
    { username, displayName, email, role: roleId }: CreateUserBodyDTO,
  ): Promise<ResponseDTO<UserEntity>> {
    const role = await this.roleService.getRoleById(roleId);

    if (!role)
      throw new NotFoundException(HttpErrorMessages.ROLE_DOES_NOT_EXIST);

    if (role.level <= user.role.level)
      throw new ForbiddenException(HttpErrorMessages.USER_CREATION_RESTRICTED);

    const createUserResult = await this.userService.createUser(
      username,
      displayName,
      email,
      role,
    );

    if (createUserResult instanceof UserEntity)
      return new ResponseDTO(HttpStatus.CREATED, [], createUserResult);

    throw new BadRequestException(createUserErrorMessages[createUserResult]);
  }
}
