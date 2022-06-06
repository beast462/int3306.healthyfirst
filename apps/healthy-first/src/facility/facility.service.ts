import { CertificateEntity, FacilityEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(FacilityEntity)
    private readonly facilityRepository: Repository<FacilityEntity>,
    @InjectRepository(CertificateEntity)
    private readonly certificateRepository: Repository<CertificateEntity>,
  ) {}

  public async getAllFacilities(): Promise<FacilityEntity[]> {
    return this.facilityRepository.find();
  }

  public async getAllFacilitiesWithDetails(
    facilities: FacilityEntity[],
  ): Promise<any> {
    const facilityDetails = [];
    for (const facility of facilities) {
      const certificate = await this.certificateRepository.findOne({
        where: { facilityId: facility.id },
      });
      let expiredDate: Date = null;
      if (certificate) {
        expiredDate = certificate.expiredDate;
      }
      const facilityWithDetails = {
        ...facility,
        expiredDate: expiredDate,
      };
      facilityDetails.push(facilityWithDetails);
    }
    return facilityDetails;
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

  public async getFacilityAndChildrenByLocationCode(
    locationCode: number,
  ): Promise<FacilityEntity[]> {
    return this.facilityRepository.find({
      where: {
        facilityLocationCode: Raw(
          (alias) =>
            `if (${locationCode} = 0x1, ${alias} > 0x1 and ${alias} < 0x100000000 and ${alias} & 0xf = ${locationCode}, if (${locationCode} > 0x1 and ${locationCode} < 0x10000, ${alias} >= 0x10000 and ${alias} < 0x100000000 and ${alias} & 0xffff = ${locationCode}, if (${locationCode} >= 0x10000 and ${locationCode} < 0x1000000, ${alias} >= 0x1000000 and ${alias} < 0x100000000 and ${alias} & 0xffffff = ${locationCode}, ${alias} < 1 )))`,
        ),
      },
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
