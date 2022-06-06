import {
  FoodSafetyAuthorityBranchEntity,
  LocationEntity,
  SeedingEntity,
} from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeedingEntity,
      LocationEntity,
      FoodSafetyAuthorityBranchEntity,
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
