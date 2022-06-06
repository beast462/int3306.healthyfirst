import { ErrorCodes } from '@/common/constants/error-codes';
import { CreateCertificateBodyDTO } from '@/common/dto/certificate/create-certificate-body.dto';
import { GetCertificateFacilityIdParamDTO } from '@/common/dto/certificate/get-certificate-facility-id.param.dto';
import { GetCertificateIdParamDTO } from '@/common/dto/certificate/get-certificate-id.param.dto';
import { GetQualifiedQueryDTO } from '@/common/dto/certificate/get-qualified-query.dto';
import { ModifyCertificateBodyDTO } from '@/common/dto/certificate/modify-certificate-body.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CertificateEntity, FacilityEntity } from '@/common/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('api/certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  public async getAllCertificates(): Promise<ResponseDTO<CertificateEntity[]>> {
    const certificates = await this.certificateService.getAllCertificates();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: certificates,
    };
  }

  @Get('id/:id')
  public async getCertificateById(
    @Param() { id }: GetCertificateIdParamDTO,
  ): Promise<ResponseDTO<CertificateEntity>> {
    const certificate = await this.certificateService.getCertificateById(id);

    if (!certificate) throw new NotFoundException('Certificate not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: certificate,
    };
  }

  @Put('id/:id')
  public async modifyCertificateById(
    @Param() { id }: GetCertificateIdParamDTO,
    @Body() newCertificate: ModifyCertificateBodyDTO,
  ): Promise<ResponseDTO<Omit<CertificateEntity, 'facility'>>> {
    const certificate = await this.certificateService.getCertificateById(id);

    if (!certificate) throw new NotFoundException('Certificate not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.certificateService.modifyCertificateById({
        ...certificate,
        ...newCertificate,
      }),
    };
  }

  @Get('facilityid/:facilityId')
  public async getCertificateByFacilityId(
    @Param() { facilityId }: GetCertificateFacilityIdParamDTO,
  ): Promise<ResponseDTO<CertificateEntity>> {
    const certificate =
      await this.certificateService.getCertificateByFacilityId(facilityId);

    if (!certificate) throw new NotFoundException('Certificate not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: certificate,
    };
  }

  @Get('qualified')
  public async getQualifiedFacility(
    @Query() { date }: GetQualifiedQueryDTO,
  ): Promise<ResponseDTO<any>> {
    const facilities = await this.certificateService.getQualifiedFacility(date);
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: facilities,
    };
  }

  @Get('unqualified')
  public async getUnqualifiedFacility(
    @Query() { date }: GetQualifiedQueryDTO,
  ): Promise<ResponseDTO<any>> {
    const facilities = await this.certificateService.getUnqualifiedFacility(
      date,
    );
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: facilities,
    };
  }

  @Put('facilityid/:facilityId')
  public async modifyCertificateByFacilityId(
    @Param() { facilityId }: GetCertificateFacilityIdParamDTO,
    @Body() newCertificate: ModifyCertificateBodyDTO,
  ): Promise<ResponseDTO<Omit<CertificateEntity, 'facility'>>> {
    const certificate =
      await this.certificateService.getCertificateByFacilityId(facilityId);

    if (!certificate) throw new NotFoundException('Certificate not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.certificateService.modifyCertificateByFacilityId({
        ...certificate,
        ...newCertificate,
      }),
    };
  }

  @Post()
  public async createCertificate(
    @Body() newCertificate: CreateCertificateBodyDTO,
  ): Promise<ResponseDTO<CertificateEntity>> {
    try {
      const certificate = await this.certificateService.createCertificate(
        newCertificate,
      );
      return {
        statusCode: HttpStatus.OK,
        message: [],
        errorCode: ErrorCodes.SUCCESS,
        body: certificate,
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  @Delete(':id')
  public async deleteCertificate(
    @Param() { id }: GetCertificateIdParamDTO,
  ): Promise<ResponseDTO<CertificateEntity>> {
    const certificate = await this.certificateService.getCertificateById(id);

    if (!certificate) throw new NotFoundException('Certificate not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.certificateService.deleteCertificate(certificate),
    };
  }
}
