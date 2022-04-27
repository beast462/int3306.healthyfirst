import { CookieEntries } from '@/common/constants/cookie-entries';
import { UserEntity } from '@/common/entities';
import { decode, verify } from '@/common/helpers/jwt';
import { AuthTokenPayload } from '@/common/models/auth-token-payload';
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { [CookieEntries.AUTH_TOKEN]: token } = req.cookies;

    if (typeof token !== 'string')
      throw new BadRequestException('required auth token not found');

    const { userId, level } = (await decode<AuthTokenPayload>(
      token,
    )) as AuthTokenPayload;

    if (typeof userId !== 'number' && typeof level !== 'number') {
      res.clearCookie(CookieEntries.AUTH_TOKEN);
      throw new BadRequestException('Invalid token');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      res.clearCookie(CookieEntries.AUTH_TOKEN);
      throw new NotFoundException("User in token's payload not found");
    }

    try {
      await verify(token, user.secret);
    } catch (err) {
      res.clearCookie(CookieEntries.AUTH_TOKEN);
      throw new BadRequestException('Invalid token');
    }

    req.user = user;
    next();
  }
}
