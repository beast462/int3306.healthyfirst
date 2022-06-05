import { ErrorCodes } from '@/common/constants/error-codes';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CreateResponsibleAreaBodyDTO } from '@/common/dto/responsible-area/create-responsible-area.body.dto';
import { GetResponsibleAreaLocationCodeDTO } from '@/common/dto/responsible-area/get-responsible-area-location-code.dto';
import { GetResponsibleAreaUserIdParamDTO } from '@/common/dto/responsible-area/get-responsible-area-user-id.param.dto';
import { ResponsibleAreaEntity } from '@/common/entities';
import { Specialist } from '@/common/models/specialist';
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
} from '@nestjs/common';
import { ResponsibleAreaService } from './responsible-area.service';

@Controller('api/responsible-area')
export class ResponsibleAreaController {
  constructor(
    private readonly responsibleAreaService: ResponsibleAreaService,
  ) {}

  @Get()
  public async getAllResponsibleAreas(): Promise<
    ResponseDTO<ResponsibleAreaEntity[]>
  > {
    const responsibleAreas =
      await this.responsibleAreaService.getAllResponsibleAreas();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: responsibleAreas,
    };
  }

  @Get('userid/:userId')
  public async getResponsibleAreaByUserId(
    @Param() { userId }: GetResponsibleAreaUserIdParamDTO,
  ): Promise<ResponseDTO<ResponsibleAreaEntity>> {
    const responsibleArea =
      await this.responsibleAreaService.getResponsibleAreaByUserId(userId);

    if (!responsibleArea)
      throw new NotFoundException('Responsible area not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: responsibleArea,
    };
  }

  @Get('code/:responsibleLocationCode')
  public async getResponsibleAreaByResponsibleLocationCode(
    @Param() { responsibleLocationCode }: GetResponsibleAreaLocationCodeDTO,
  ): Promise<ResponseDTO<ResponsibleAreaEntity[]>> {
    const responsibleArea =
      await this.responsibleAreaService.getResponsibleAreaByResponsibleLocationCode(
        responsibleLocationCode,
      );

    if (!responsibleArea)
      throw new NotFoundException('Responsible area not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: responsibleArea,
    };
  }

  @Get('users/:responsibleLocationCode')
  public async getSpecialist(
    @Param() { responsibleLocationCode }: GetResponsibleAreaLocationCodeDTO,
  ): Promise<ResponseDTO<Specialist[]>> {
    const responsibleArea =
      await this.responsibleAreaService.getResponsibleAreaByResponsibleLocationCode(
        responsibleLocationCode,
      );

    if (!responsibleArea)
      throw new NotFoundException('Responsible area not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.responsibleAreaService.getSpecialist(responsibleArea),
    };
  }

  @Post()
  public async createResponsibleArea(
    @Body() newResponsibleArea: CreateResponsibleAreaBodyDTO,
  ): Promise<ResponseDTO<ResponsibleAreaEntity>> {
    try {
      const responsibleArea =
        await this.responsibleAreaService.createResponsibleArea(
          newResponsibleArea,
        );
      return {
        statusCode: HttpStatus.OK,
        message: [],
        errorCode: ErrorCodes.SUCCESS,
        body: responsibleArea,
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  @Delete('userid/:userId')
  public async deleteResponsibleAreaByUserId(
    @Param() { userId }: GetResponsibleAreaUserIdParamDTO,
  ): Promise<ResponseDTO<ResponsibleAreaEntity>> {
    const responsibleArea =
      await this.responsibleAreaService.getResponsibleAreaByUserId(userId);

    if (!responsibleArea)
      throw new NotFoundException('Responsible area not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.responsibleAreaService.deleteResponsibleAreaByUserId(
        responsibleArea,
      ),
    };
  }
}
