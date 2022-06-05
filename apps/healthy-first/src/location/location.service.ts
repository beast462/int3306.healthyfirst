import { LocationEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  public async getAllLocations(): Promise<LocationEntity[]> {
    return this.locationRepository.find();
  }

  public async getLocationById(id: number): Promise<LocationEntity> {
    return this.locationRepository.findOne({
      where: { id: id },
    });
  }
}
