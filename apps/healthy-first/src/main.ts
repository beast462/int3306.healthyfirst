import * as cookieParser from 'cookie-parser';

import { DbLoggerService } from '@/db-logger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigKeys } from './base/config.module';
import { ErrorLoggingFilter } from './error-logging/error-logging.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const secret = configService.get<string>(ConfigKeys.COOKIE_SECRET);
  app.use(cookieParser(secret));

  const dbLoggerService = await app.resolve(DbLoggerService);

  app.useGlobalFilters(new ErrorLoggingFilter(dbLoggerService));

  await app.listen(configService.get<number>(ConfigKeys.SERVER_PORT));
}

bootstrap();
