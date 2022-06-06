import { ErrorCodes } from '@/common/constants/error-codes';
import { GetLocationByCodeParamDTO } from '@/common/dto/location/get-location-by-code.param.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { LocationEntity } from '@/common/entities';
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('api/location/')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  public async getAllLocations(): Promise<ResponseDTO<LocationEntity[]>> {
    const locations = await this.locationService.getAllLocations();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: locations,
    };
  }

  @Get('provinces')
  public async getAllProvinces(): Promise<ResponseDTO<LocationEntity[]>> {
    const locations = await this.locationService.getAllProvinces();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: locations,
    };
  }

  @Get('districts')
  public async getAllDistricts(): Promise<ResponseDTO<LocationEntity[]>> {
    const locations = await this.locationService.getAllDistricts();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: locations,
    };
  }

  @Get('wards')
  public async getAllWards(): Promise<ResponseDTO<LocationEntity[]>> {
    const locations = await this.locationService.getAllWards();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: locations,
    };
  }

  @Get(':code')
  public async getLocationByCode(
    @Param() { code }: GetLocationByCodeParamDTO,
  ): Promise<ResponseDTO<LocationEntity>> {
    const location = await this.locationService.getLocationByCode(code);

    if (!location) throw new NotFoundException('Location not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: location,
    };
  }

  @Get(':code/children')
  public async getChildrenByCode(
    @Param() { code }: GetLocationByCodeParamDTO,
  ): Promise<ResponseDTO<LocationEntity[]>> {
    const locations = await this.locationService.getLocationAndChildrenByCode(
      code,
    );
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: locations,
    };
  }
}