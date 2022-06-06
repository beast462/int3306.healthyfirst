import { CertificateEntity, FacilityEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';

@Module({
  imports: [TypeOrmModule.forFeature([FacilityEntity, CertificateEntity])],
  controllers: [FacilityController],
  providers: [FacilityService],
})
export class FacilityModule {}
