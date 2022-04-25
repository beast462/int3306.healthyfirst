import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { randomBytes } from 'crypto';
import session from 'express-session';
import { AppModule } from './app.module';
import { ConfigKeys } from './base/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: randomBytes(32).toString('hex'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>(ConfigKeys.SERVER_PORT));
}
bootstrap();
