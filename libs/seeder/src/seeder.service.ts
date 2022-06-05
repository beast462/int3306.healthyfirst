import { join, resolve } from 'path';
import { Repository } from 'typeorm';

import { LocationEntity } from '@/common/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';

@Injectable()
export class SeederService {
  private static readonly SEEDS_LOCATION = resolve(__dirname, '../../../seeds');

  private readonly logger: Logger;

  public constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {
    this.logger = new Logger('SeederService');

    this.seedLocations();
  }

  private async seedLocations(): Promise<void> {
    const count = await this.locationRepository.count();

    if (count !== 0) return;

    this.logger.log('No locations found, seeding locations...');

    const locations = JSON.parse(
      readFileSync(
        join(SeederService.SEEDS_LOCATION, 'locations.json'),
        'utf8',
      ),
    );

    this.locationRepository.save(locations);
  }
}
