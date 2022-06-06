import { LocationEntity, SeedingEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeedingEntity, LocationEntity])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
