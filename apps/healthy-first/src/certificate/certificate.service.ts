import { CertificateEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CertificateEntity)
    private readonly certificateRepository: Repository<CertificateEntity>,
  ) {}

  public async getAllCertificates(): Promise<CertificateEntity[]> {
    return this.certificateRepository.find();
  }

  public async getCertificateById(id: number): Promise<CertificateEntity> {
    return this.certificateRepository.findOne({
      where: { id: id },
    });
  }

  public async modifyCertificateById(
    modifiedCertificate: Omit<CertificateEntity, 'facility'>,
  ): Promise<Omit<CertificateEntity, 'facility'>> {
    await this.certificateRepository.update(
      { id: modifiedCertificate.id },
      modifiedCertificate,
    );

    return modifiedCertificate;
  }

  public async getCertificateByFacilityId(
    facilityId: number,
  ): Promise<CertificateEntity> {
    return this.certificateRepository.findOne({
      where: { facilityId: facilityId },
    });
  }

  public async modifyCertificateByFacilityId(
    modifiedCertificate: Omit<CertificateEntity, 'facility'>,
  ): Promise<Omit<CertificateEntity, 'facility'>> {
    await this.certificateRepository.update(
      { facilityId: modifiedCertificate.facilityId },
      modifiedCertificate,
    );

    return modifiedCertificate;
  }

  public async createCertificate(
    newCertificate: Omit<CertificateEntity, 'id' | 'facility'>,
  ): Promise<CertificateEntity> {
    return (await this.certificateRepository.insert(newCertificate))
      .generatedMaps[0] as CertificateEntity;
  }

  public async deleteCertificate(
    removedCertificate: CertificateEntity,
  ): Promise<CertificateEntity> {
    await this.certificateRepository.remove(removedCertificate);
    return removedCertificate;
  }
}
