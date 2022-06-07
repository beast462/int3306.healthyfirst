import { ErrorCodes } from '@/common/constants/error-codes';
import { CreateCheckingPlanBodyDTO } from '@/common/dto/checking-plan/create-checking-plan.body.dto';
import { GetCheckingPlanFacilityIdParamDTO } from '@/common/dto/checking-plan/get-checking-plan-facility-id.param.dto';
import { GetCheckingPlanIdParamDTO } from '@/common/dto/checking-plan/get-checking-plan-id.param.dto';
import { ModifyCheckingPlanBodyDTO } from '@/common/dto/checking-plan/modify-checking-plan.body.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CheckingPlanEntity } from '@/common/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FacilityService } from '../facility/facility.service';
import { CheckingPlanService } from './checking-plan.service';

@Controller('api/checking-plan')
export class CheckingPlanController {
  constructor(
    private readonly checkingPlanService: CheckingPlanService,
    private readonly facilityService: FacilityService,
  ) {}

  @Get()
  public async getAllCheckingPlans(): Promise<
    ResponseDTO<CheckingPlanEntity[]>
  > {
    const checkingPlans = await this.checkingPlanService.getAllCheckingPlans();
    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: checkingPlans,
    };
  }

  @Get('id/:id')
  public async getCheckingPlanById(
    @Param() { id }: GetCheckingPlanIdParamDTO,
  ): Promise<ResponseDTO<CheckingPlanEntity>> {
    const checkingPlan = await this.checkingPlanService.getCheckingPlanById(id);

    if (!checkingPlan) throw new NotFoundException('Checking plan not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: checkingPlan,
    };
  }

  @Get('facilityid/:facilityId')
  public async getCheckingPlanByFacilityId(
    @Param() { facilityId }: GetCheckingPlanFacilityIdParamDTO,
  ): Promise<ResponseDTO<CheckingPlanEntity[]>> {
    const facility = await this.facilityService.getFacilityById(facilityId);

    if (!facility) throw new NotFoundException('Facility not found');

    const checkingPlan =
      await this.checkingPlanService.getCheckingPlanByFacilityId(facilityId);

    if (!checkingPlan) throw new NotFoundException('Checking plan not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: checkingPlan,
    };
  }

  @Put(':id')
  public async modifyCheckingPlan(
    @Param() { id }: GetCheckingPlanIdParamDTO,
    @Body() modifiedCheckingPlan: ModifyCheckingPlanBodyDTO,
  ): Promise<ResponseDTO<Omit<CheckingPlanEntity, 'facility'>>> {
    const checkingPlan = await this.checkingPlanService.getCheckingPlanById(id);

    if (!checkingPlan) throw new NotFoundException('Checking plan not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.checkingPlanService.modifyCheckingPlan({
        ...checkingPlan,
        ...modifiedCheckingPlan,
      }),
    };
  }

  @Post()
  public async createCheckingPlan(
    @Body() checkingPlan: CreateCheckingPlanBodyDTO,
  ): Promise<ResponseDTO<CheckingPlanEntity>> {
    try {
      const newPlan = await this.checkingPlanService.createCheckingPlan(
        checkingPlan,
      );
      return {
        statusCode: HttpStatus.OK,
        message: [],
        errorCode: ErrorCodes.SUCCESS,
        body: newPlan,
      };
    } catch (error) {}
  }

  @Delete(':id')
  public async deleteCheckingPlan(
    @Param() { id }: GetCheckingPlanIdParamDTO,
  ): Promise<ResponseDTO<CheckingPlanEntity>> {
    const checkingPlan = await this.checkingPlanService.getCheckingPlanById(id);

    if (!checkingPlan) throw new NotFoundException('Checking plan not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.checkingPlanService.deleteCheckingPlan(checkingPlan),
    };
  }
}
