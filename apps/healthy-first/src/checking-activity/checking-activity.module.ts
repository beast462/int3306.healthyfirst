import { CheckingActivityEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckingActivityController } from './checking-activity.controller';
import { CheckingActivityService } from './checking-activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckingActivityEntity])],
  controllers: [CheckingActivityController],
  providers: [CheckingActivityService],
})
export class CheckingActivityModule {}
