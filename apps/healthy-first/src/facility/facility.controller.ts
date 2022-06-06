import { ErrorCodes } from '@/common/constants/error-codes';
import { CreateFacilityBodyDTO } from '@/common/dto/facility/create-facility.body.dto';
import { GetFacilityIdParamDTO } from '@/common/dto/facility/get-facility-id.param.dto';
import { GetFacilityLocationCodeParamDTO } from '@/common/dto/facility/get-facility-location-code.param.dto';
import { GetFacilityLocationByCodeParamDTO } from '@/common/dto/facility/get-location-by-code.param.dto';
import { ModifyFacilityBodyDTO } from '@/common/dto/facility/modify-facility.body.dto';
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

  @Get('details')
  public async getAllFacilitiesWithDetails(): Promise<ResponseDTO<any>> {
    const facilities = await this.facilityService.getAllFacilities();

    if (!facilities) throw new NotFoundException('Facilities not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.facilityService.getAllFacilitiesWithDetails(facilities),
    };
  }

  @Get('id/:id')
  public async getFacilityById(
    @Param() { id }: GetFacilityIdParamDTO,
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

  @Get('code/:facilityLocationCode')
  public async getFacilityByFacilityLocationCode(
    @Param() { facilityLocationCode }: GetFacilityLocationCodeParamDTO,
  ): Promise<ResponseDTO<FacilityEntity>> {
    const facility =
      await this.facilityService.getFacilityByFacilityLocationCode(
        facilityLocationCode,
      );

    if (!facility) throw new NotFoundException('Facility not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: facility,
    };
  }

  @Get('code/:locationCode/children')
  public async getFacilityAndChildrenByLocationCode(
    @Param() { locationCode }: GetFacilityLocationByCodeParamDTO,
  ): Promise<ResponseDTO<FacilityEntity[]>> {
    const facility =
      await this.facilityService.getFacilityAndChildrenByLocationCode(
        locationCode,
      );

    if (!facility) throw new NotFoundException('Facility not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: facility,
    };
  }

  @Put(':id')
  public async modifyFacility(
    @Param() { id }: GetFacilityIdParamDTO,
    @Body() modifiedFacility: ModifyFacilityBodyDTO,
  ): Promise<
    ResponseDTO<Omit<FacilityEntity, 'facilityType' | 'facilityLocation'>>
  > {
    const facility = await this.facilityService.getFacilityById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.facilityService.modifyFacility({
        ...facility,
        ...modifiedFacility,
      }),
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
    @Param() { id }: GetFacilityIdParamDTO,
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
