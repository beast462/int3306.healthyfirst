import { join, resolve } from 'path';
import { Repository } from 'typeorm';

import {
  FoodSafetyAuthorityBranchEntity,
  LocationEntity,
  SeedingEntity,
} from '@/common/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';

@Injectable()
export class SeederService {
  private static readonly SEEDS_LOCATION = resolve(__dirname, '../../../seeds');

  private readonly logger: Logger;

  public constructor(
    @InjectRepository(SeedingEntity)
    private readonly seedingRepository: Repository<SeedingEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(FoodSafetyAuthorityBranchEntity)
    private readonly fsaBranchRepository: Repository<FoodSafetyAuthorityBranchEntity>,
  ) {
    this.logger = new Logger('SeederService');

    this.seedLocations();
    this.seedFSABranches();
  }

  private async seedLocations(): Promise<void> {
    const seeded =
      (await this.seedingRepository.count({ name: 'locations' })) !== 0;

    if (seeded) return;

    this.logger.log('Location table was not seeded, seeding locations...');

    const locations = JSON.parse(
      readFileSync(
        join(SeederService.SEEDS_LOCATION, 'locations.json'),
        'utf8',
      ),
    );

    await this.locationRepository.save(locations);

    this.logger.log('Location table seeded');
  }

  private async seedFSABranches(): Promise<void> {
    const seeded =
      (await this.seedingRepository.count({ name: 'fsa-branches' })) !== 0;

    if (seeded) return;

    this.logger.log('FSABranch table was not seeded, seeding FSABranches...');

    const fsaBranches = JSON.parse(
      readFileSync(
        join(SeederService.SEEDS_LOCATION, 'fsa-branches.json'),
        'utf8',
      ),
    );

    await this.fsaBranchRepository.save(fsaBranches);

    this.logger.log('FSABranch table seeded');
  }
}
