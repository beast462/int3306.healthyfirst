import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FacilityTypeEntity } from '@/common/entities';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { FacilityTypeService } from './facility-type.service';

@Controller('facility-type')
export class FacilityTypeController {
  constructor(private readonly facilityTypeService: FacilityTypeService) {}

  @Get()
  public async getAllFacilityTypes(): Promise<
    ResponseDTO<FacilityTypeEntity[]>
  > {
    const facilityTypes = await this.facilityTypeService.getAllFacilityTypes();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: facilityTypes,
    };
  }
}
