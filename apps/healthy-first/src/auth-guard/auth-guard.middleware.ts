import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

import { CookieEntries } from '@/common/constants/cookie-entries';
import { Environments } from '@/common/constants/environments';
import { UserEntity } from '@/common/entities';
import { decode, sign, verify } from '@/common/helpers/jwt';
import { AuthTokenPayload } from '@/common/models/auth-token-payload';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigKeys } from '../base/config.module';
import { createError } from '@/common/helpers/create-error';
import { ErrorCodes } from '@/common/constants/error-codes';

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware {
  private readonly isProd: boolean;
  private readonly tokenExpiration: number;

  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    configService: ConfigService,
  ) {
    this.isProd =
      configService.get<Environments>(ConfigKeys.ENVIRONMENT) ===
      Environments.PRODUCTION;
    this.tokenExpiration = configService.get<number>(ConfigKeys.AUTH_TOKEN_EXP);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token =
      req[this.isProd ? 'signedCookies' : 'cookies'][CookieEntries.AUTH_TOKEN];

    if (typeof token !== 'string')
      createError(BadRequestException, ErrorCodes.AUTH_TOKEN_MISSING);

    let id: number;

    try {
      const { userId, level } = (await decode<AuthTokenPayload>(
        token,
      )) as AuthTokenPayload;
      id = userId;

      if (typeof userId !== 'number' && typeof level !== 'number') {
        res.clearCookie(CookieEntries.AUTH_TOKEN);
        createError(BadRequestException, ErrorCodes.AUTH_TOKEN_INVALID);
      }
    } catch (err) {
      createError(BadRequestException, ErrorCodes.AUTH_TOKEN_INVALID);
    }

    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      res.clearCookie(CookieEntries.AUTH_TOKEN);
      createError(NotFoundException, ErrorCodes.USER_IN_AUTH_TOKEN_NOT_FOUND);
    }

    try {
      await verify(token, user.secret);
    } catch (err) {
      res.clearCookie(CookieEntries.AUTH_TOKEN);
      createError(BadRequestException, ErrorCodes.AUTH_TOKEN_INVALID);
    }

    const newTokenExpiration = Date.now() + this.tokenExpiration;
    const newToken = await sign(
      {
        userId: user.id,
        level: user.role,
        exp: ~~(newTokenExpiration / 1000),
      },
      user.secret,
    );

    res.cookie(CookieEntries.AUTH_TOKEN, newToken, {
      httpOnly: true,
      signed: this.isProd,
      expires: new Date(newTokenExpiration),
      sameSite: 'strict',
    });

    req.user = user;
    next();
  }
}
