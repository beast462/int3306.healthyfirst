import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CertificateEntity } from '@/common/entities';
import { Controller, Get, HttpStatus } from '@nestjs/common';
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
}
