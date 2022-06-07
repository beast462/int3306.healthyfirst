import {
  CertificateEntity,
  CheckingPlanEntity,
  FacilityEntity,
} from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FacilityEntity,
      CertificateEntity,
      CheckingPlanEntity,
    ]),
  ],
  controllers: [FacilityController],
  providers: [FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
