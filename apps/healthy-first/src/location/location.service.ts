import { LocationEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  public async getAllLocations(): Promise<LocationEntity[]> {
    return this.locationRepository.find({
      where: { code: Raw((alias) => `${alias} > 0x1 and ${alias} < 0x10000`) },
    });
  }

  public async getLocationByCode(code: number): Promise<LocationEntity> {
    return this.locationRepository.findOne({
      where: { code: code },
    });
  }

  public async getLocationAndChildrenByCode(
    code: number,
  ): Promise<LocationEntity[]> {
    return this.locationRepository.find({
      where: {
        code: Raw(
          (alias) =>
            `if (${code} = 0x1, ${alias} > 0x1 and ${alias} < 0x10000 and ${alias} & 0xf = ${code}, if (${code} > 0x1 and ${code} < 0x10000, ${alias} >= 0x10000 and ${alias} < 0x1000000 and ${alias} & 0xffff = ${code}, if (${code} >= 0x10000 and ${code} < 0x1000000, ${alias} >= 0x1000000 and ${alias} < 0x100000000 and ${alias} & 0xffffff = ${code}, ${alias} < 1 )))`,
        ),
      },
    });
  }
}
