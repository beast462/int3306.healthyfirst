import { CheckingPlanEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityModule } from '../facility/facility.module';
import { CheckingPlanController } from './checking-plan.controller';
import { CheckingPlanService } from './checking-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckingPlanEntity]), FacilityModule],
  controllers: [CheckingPlanController],
  providers: [CheckingPlanService],
})
export class CheckingPlanModule {}
