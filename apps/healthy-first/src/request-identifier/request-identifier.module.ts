import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RequestIdentifierMiddleware } from './request-identifier.middleware';

@Module({
  imports: [ConfigModule],
})
export class RequestIdentifierModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdentifierMiddleware).forRoutes('/api/user/login');
  }
}
