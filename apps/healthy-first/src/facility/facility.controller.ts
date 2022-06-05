import { ErrorCodes } from '@/common/constants/error-codes';
import { GetFacilityParamDTO } from '@/common/dto/facility/get-facility.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FacilityEntity } from '@/common/entities';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FacilityService } from './facility.service';

@Controller('api/facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  public async getAllFacilities(): Promise<ResponseDTO<FacilityEntity[]>> {
    const facilities = await this.facilityService.getAllFacilities();
    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully fetched all Facilities'],
      errorCode: ErrorCodes.SUCCESS,
      body: facilities,
    };
  }

  @Get(':id')
  public async getFacilityById(
    @Param() { id }: GetFacilityParamDTO,
  ): Promise<ResponseDTO<FacilityEntity>> {
    const facility = await this.facilityService.getFacilityById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully fetched Facility'],
      errorCode: ErrorCodes.SUCCESS,
      body: facility,
    };
  }

  @Delete(':id')
  public async deleteFacility(
    @Param() { id }: GetFacilityParamDTO,
  ): Promise<ResponseDTO<FacilityEntity>> {
    const facility = await this.facilityService.getFacilityById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully deleted Facility'],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.facilityService.deleteFacility(facility),
    };
  }
}
