import { ErrorCodes } from '@/common/constants/error-codes';
import { CreateFacilityBodyDTO } from '@/common/dto/facility/create-facility.body.dto';
import { GetFacilityParamDTO } from '@/common/dto/facility/get-facility.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FacilityEntity } from '@/common/entities';
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
} from '@nestjs/common';
import { FacilityService } from './facility.service';

@Controller('api/facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Get()
  public async getAllFacilities(): Promise<ResponseDTO<FacilityEntity[]>> {
    const facilities = await this.facilityService.getAllFacilities();
    return {
      statusCode: HttpStatus.OK,
      message: [],
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
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: facility,
    };
  }

  @Post()
  public async createFacility(
    @Body() newFacility: CreateFacilityBodyDTO,
  ): Promise<ResponseDTO<FacilityEntity>> {
    try {
      const facility = await this.facilityService.createFacility(newFacility);
      return {
        statusCode: HttpStatus.CREATED,
        message: [],
        errorCode: ErrorCodes.SUCCESS,
        body: facility,
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  @Delete(':id')
  public async deleteFacility(
    @Param() { id }: GetFacilityParamDTO,
  ): Promise<ResponseDTO<FacilityEntity>> {
    const facility = await this.facilityService.getFacilityById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.facilityService.deleteFacility(facility),
    };
  }
}
