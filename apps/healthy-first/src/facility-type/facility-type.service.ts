import { FacilityTypeEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FacilityTypeService {
  constructor(
    @InjectRepository(FacilityTypeEntity)
    private readonly facilityTypeRepository: Repository<FacilityTypeEntity>,
  ) {}

  public async getAllFacilityTypes(): Promise<FacilityTypeEntity[]> {
    return this.facilityTypeRepository.find();
  }
}
