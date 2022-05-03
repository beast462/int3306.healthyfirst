import { CookieEntries } from './../../../../libs/common/src/constants/cookie-entries';
import { byMinutes } from '@/common/helpers/timespan';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { v4, validate } from 'uuid';
import { ConfigKeys } from '../base/config.module';
import { Environments } from '@/common/constants/environments';

@Injectable()
export class RequestIdentifierMiddleware implements NestMiddleware {
  public constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const isProd =
      this.configService.get<Environments>(ConfigKeys.ENVIRONMENT) ===
      Environments.PRODUCTION;

    const rid = (() => {
      return req[isProd ? 'signedCookies' : 'cookies'][
        CookieEntries.REQUEST_ID
      ];
    })();

    if (typeof rid === 'string' && validate(rid)) return next();

    req.cookies.rid = v4();
    res.cookie(CookieEntries.REQUEST_ID, req.cookies.rid, {
      httpOnly: true,
      signed: isProd,
      expires: new Date(Date.now() + byMinutes(5)),
      sameSite: 'strict',
    });

    next();
  }
}
