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

  public async getFacilityByFacilityLocationCode(
    facilityLocationCode: number,
  ): Promise<FacilityEntity> {
    return this.facilityRepository.findOne({
      where: { facilityLocationCode: facilityLocationCode },
    });
  }

  public async modifyFacility(
    modifiedFacility: Omit<FacilityEntity, 'facilityType' | 'facilityLocation'>,
  ): Promise<Omit<FacilityEntity, 'facilityType' | 'facilityLocation'>> {
    await this.facilityRepository.update(
      { id: modifiedFacility.id },
      modifiedFacility,
    );

    return modifiedFacility;
  }

  public async createFacility(
    newFacility: Omit<
      FacilityEntity,
      'id' | 'facilityType' | 'facilityLocation'
    >,
  ): Promise<FacilityEntity> {
    return (await this.facilityRepository.insert(newFacility))
      .generatedMaps[0] as FacilityEntity;
  }

  public async deleteFacility(
    removedFacility: FacilityEntity,
  ): Promise<FacilityEntity> {
    await this.facilityRepository.remove(removedFacility);
    return removedFacility;
  }
}
