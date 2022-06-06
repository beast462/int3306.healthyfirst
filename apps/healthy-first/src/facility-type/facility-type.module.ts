import { FacilityTypeEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacilityTypeController } from './facility-type.controller';
import { FacilityTypeService } from './facility-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([FacilityTypeEntity])],
  controllers: [FacilityTypeController],
  providers: [FacilityTypeService],
})
export class FacilityTypeModule {}
