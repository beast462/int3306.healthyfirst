import { RoleEntity, UserEntity } from '@/common/entities';
import { byMinutes } from '@/common/helpers/timespan';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';

import { RoleService } from './role.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    ConfigModule,
    CacheModule.register({
      ttl: byMinutes(5),
    }),
    MailModule,
  ],
  providers: [UserService, RoleService],
  controllers: [UserController],
})
export class UserModule {}
