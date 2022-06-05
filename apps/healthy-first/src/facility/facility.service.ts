import { FacilityEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(FacilityEntity)
    private readonly facilityRepository: Repository<FacilityEntity>,
  ) {}

  public async getAllFacilities(): Promise<FacilityEntity[]> {
    return this.facilityRepository.find();
  }

  public async getFacilityById(id: number): Promise<FacilityEntity> {
    return this.facilityRepository.findOne({
      where: { id: id },
    });
  }

  public async deleteFacility(
    removedFacility: FacilityEntity,
  ): Promise<FacilityEntity> {
    await this.facilityRepository.remove(removedFacility);
    return removedFacility;
  }
}
