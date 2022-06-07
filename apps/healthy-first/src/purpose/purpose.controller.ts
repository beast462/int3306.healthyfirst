import { ErrorCodes } from '@/common/constants/error-codes';
import { GetPurposeIdParamDTO } from '@/common/dto/purpose/get-purpose-id.param.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { PurposeEntity } from '@/common/entities';
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PurposeService } from './purpose.service';

@Controller('api/purpose')
export class PurposeController {
  constructor(private readonly purposeService: PurposeService) {}

  @Get()
  public async getAllPurpose(): Promise<ResponseDTO<PurposeEntity[]>> {
    const purposes = await this.purposeService.getAllPurpose();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: purposes,
    };
  }

  @Get(':id')
  public async getPurposeById(
    @Param() { id }: GetPurposeIdParamDTO,
  ): Promise<ResponseDTO<PurposeEntity>> {
    const purpose = await this.purposeService.getPurposeById(id);

    if (!purpose) throw new NotFoundException('Purpose not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: purpose,
    };
  }
}
