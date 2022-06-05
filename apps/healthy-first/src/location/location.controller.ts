import { ErrorCodes } from '@/common/constants/error-codes';
import { GetLocationParamDTO } from '@/common/dto/location/get-location.dto';
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
      message: ['Successfully fetched all locations'],
      errorCode: ErrorCodes.SUCCESS,
      body: locations,
    };
  }

  @Get(':id')
  public async getLocationById(
    @Param() { id }: GetLocationParamDTO,
  ): Promise<ResponseDTO<LocationEntity>> {
    const location = await this.locationService.getLocationById(id);

    if (!location) throw new NotFoundException('Location not found');

    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully fetched location'],
      errorCode: ErrorCodes.SUCCESS,
      body: location,
    };
  }
}
