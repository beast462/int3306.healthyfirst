import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ConfigKeys } from './base/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const secret = configService.get<string>(ConfigKeys.COOKIE_SECRET);
  app.use(cookieParser(secret));

  await app.listen(configService.get<number>(ConfigKeys.SERVER_PORT));
}
bootstrap();
