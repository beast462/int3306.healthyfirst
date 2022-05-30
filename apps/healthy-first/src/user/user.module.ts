import { RoleEntity, UserEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../mail/mail.module';
import { RoleModule } from '../role/role.module';
import { UserUtilsController } from './user-utils.controller';
import { UserUtilsService } from './user-utils.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    ConfigModule,
    MailModule,
    RoleModule,
  ],
  providers: [UserService, UserUtilsService],
  controllers: [UserUtilsController, UserController],
})
export class UserModule {}
