import { CertificateEntity, FacilityEntity } from '@/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CertificateEntity, FacilityEntity])],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
