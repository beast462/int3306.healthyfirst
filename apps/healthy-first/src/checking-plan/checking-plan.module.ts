import { CheckingPlanEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckingPlanController } from './checking-plan.controller';
import { CheckingPlanService } from './checking-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckingPlanEntity])],
  controllers: [CheckingPlanController],
  providers: [CheckingPlanService],
})
export class CheckingPlanModule {}
