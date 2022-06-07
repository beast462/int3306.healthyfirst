import { CertificateEntity, FacilityEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CertificateEntity)
    private readonly certificateRepository: Repository<CertificateEntity>,
    @InjectRepository(FacilityEntity)
    private readonly facilityRepository: Repository<FacilityEntity>,
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

  public async getQualifiedFacility(date: Date): Promise<any> {
    const certificates = await this.certificateRepository.find({
      where: {
        expiredDate: Raw((alias) => `${alias} < '${date.toISOString()}'`),
        revoked: 0,
      },
    });

    const qualifiedFacility = [];
    for (const certificate of certificates) {
      const facility = await this.facilityRepository.findOne({
        where: { id: certificate.facilityId },
      });

      if (!facility) continue;

      const facilityWithDetails = {
        ...facility,
        expiredDate: certificate.expiredDate,
        issueId: certificate.issueId,
      };

      qualifiedFacility.push(facilityWithDetails);
    }

    return qualifiedFacility;
  }

  public async getUnqualifiedFacility(date: Date): Promise<any> {
    const facilities = await this.facilityRepository.find();
    const unqualifiedFacility = [];

    for (const facility of facilities) {
      const certificate = await this.certificateRepository.findOne({
        where: { facilityId: facility.id },
      });
      let expiredDate: Date = null;
      let revoked: number = null;
      let issueId: number = null;
      if (certificate) {
        expiredDate = certificate.expiredDate;
        revoked = certificate.revoked;
        issueId = certificate.issueId;
      }
      const facilityWithDetails = {
        ...facility,
        expiredDate: expiredDate,
        revoked: revoked,
        issueId: issueId,
      };
      if (revoked === null || revoked === 1 || expiredDate <= date) {
        unqualifiedFacility.push(facilityWithDetails);
      }
    }

    return unqualifiedFacility;
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
    const certificate = (
      await this.certificateRepository.insert(newCertificate)
    ).generatedMaps[0] as CertificateEntity;

    return await this.certificateRepository.findOne({
      where: { id: certificate.id },
    });
  }

  public async deleteCertificate(
    removedCertificate: CertificateEntity,
  ): Promise<CertificateEntity> {
    await this.certificateRepository.remove(removedCertificate);
    return removedCertificate;
  }
}
