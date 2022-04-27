import { UserEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuardMiddleware } from './auth-guard.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [AuthGuardMiddleware],
})
export class AuthGuardModule {}
