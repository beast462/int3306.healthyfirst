import { byHours } from '@/common/helpers/timespan';
import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ResourceHandlerMiddleware } from './resource-handler.middleware';

@Module({
  imports: [
    ConfigModule,
    CacheModule.register({
      max: 50,
      ttl: byHours(2),
    }),
  ],
})
export class ViewModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResourceHandlerMiddleware).forRoutes('/');
  }
}
