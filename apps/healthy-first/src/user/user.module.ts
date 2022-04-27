import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/common/entities';
import { AuthGuardModule } from '../auth-guard/auth-guard.module';
import { AuthGuardMiddleware } from '../auth-guard/auth-guard.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthGuardModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware)
      .exclude({ path: '/api/user/login', method: RequestMethod.ALL })
      .forRoutes(
        { path: '/api/user', method: RequestMethod.ALL },
        { path: '/api/user/*', method: RequestMethod.ALL },
      );
  }
}
