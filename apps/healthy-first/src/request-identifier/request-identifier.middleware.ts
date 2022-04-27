import { CookieEntries } from './../../../../libs/common/src/constants/cookie-entries';
import { byMinutes } from '@/common/helpers/timespan';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { v4, validate } from 'uuid';
import { ConfigKeys } from '../base/config.module';

@Injectable()
export class RequestIdentifierMiddleware implements NestMiddleware {
  public constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const {
      cookies: { [CookieEntries.REQUEST_ID]: rid },
    } = req;

    if (typeof rid === 'string' && validate(rid)) return next();

    req.cookies.rid = v4();
    res.cookie(CookieEntries.REQUEST_ID, req.cookies.rid, {
      httpOnly: true,
      secure:
        this.configService.get<string>(ConfigKeys.ENVIRONMENT) !==
        'development',
      expires: new Date(Date.now() + byMinutes(5)),
      sameSite: 'strict',
    });

    next();
  }
}
