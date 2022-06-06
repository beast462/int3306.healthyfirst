import { join, resolve } from 'path';
import { Connection, Repository } from 'typeorm';

import { SeedingEntity } from '@/common/entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { readdirSync, readFileSync } from 'fs';

@Injectable()
export class SeederService {
  private static readonly SEEDS_LOCATION = resolve(__dirname, '../../../seeds');

  private readonly logger: Logger;

  public constructor(
    @InjectRepository(SeedingEntity)
    private readonly seedingRepository: Repository<SeedingEntity>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    this.logger = new Logger('SeederService');

    this.seed();
  }

  private async seed(): Promise<void> {
    const seeds = readdirSync(SeederService.SEEDS_LOCATION);

    const meta = this.connection.entityMetadatas;

    for (const seed of seeds) {
      const { table, data } = JSON.parse(
        readFileSync(join(SeederService.SEEDS_LOCATION, seed), 'utf8'),
      );

      const entityMeta = meta.find((metadata) => metadata.tableName === table);

      if (!entityMeta) {
        this.logger.warn(`Seeding ${table} failed: no table found`);
        continue;
      }

      const seeded =
        (await this.seedingRepository.count({ name: table })) !== 0;

      if (seeded) continue;

      this.logger.log(`${table} table was not seeded, seeding ${table}...`);

      const repository = this.connection.getRepository(entityMeta.name);

      await this.seedingRepository
        .createQueryBuilder()
        .insert()
        .into(table)
        .values(data.map((record) => repository.create(record)))
        .orIgnore(true)
        .execute();

      await this.seedingRepository.insert({ name: table });

      this.logger.log(`${table} table seeded`);
    }
  }
}
