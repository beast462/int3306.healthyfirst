import { UserEntity } from '@/common/entities';
import { byMinutes } from '@/common/helpers/timespan';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    CacheModule.register({
      ttl: byMinutes(5),
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
