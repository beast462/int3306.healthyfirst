import { ErrorCodes } from '@/common/constants/error-codes';
import { CreateCheckingActivityBodyDTO } from '@/common/dto/checking-activity/create-checking-activity.body.dto';
import { GetCheckingActivityIdParamDTO } from '@/common/dto/checking-activity/get-checking-activity-id.param.dto';
import { GetPlanIdParamDTO } from '@/common/dto/checking-activity/get-plan-id.param.dto';
import { ModifyCheckingActivityBodyDTO } from '@/common/dto/checking-activity/modify-checking-activity.body.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { CheckingActivityEntity } from '@/common/entities';
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
import { CheckingActivityService } from './checking-activity.service';

@Controller('api/checking-activity')
export class CheckingActivityController {
  constructor(
    private readonly checkingActivityService: CheckingActivityService,
  ) {}

  @Get()
  public async getAllCheckingActivities(): Promise<
    ResponseDTO<CheckingActivityEntity[]>
  > {
    const checkingActivities =
      await this.checkingActivityService.getAllCheckingActivities();

    if (!checkingActivities)
      throw new NotFoundException('Checking Activities not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: checkingActivities,
    };
  }

  @Get('id/:id')
  public async getCheckingActivityById(
    @Param() { id }: GetCheckingActivityIdParamDTO,
  ): Promise<ResponseDTO<CheckingActivityEntity>> {
    const checkingActivity =
      await this.checkingActivityService.getCheckingActivityById(id);

    if (!checkingActivity)
      throw new NotFoundException('Checking activity not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: checkingActivity,
    };
  }

  @Get('checkingplanid/:checkingPlanId')
  public async getCheckingActivityByPlanId(
    @Param() { checkingPlanId }: GetPlanIdParamDTO,
  ): Promise<ResponseDTO<CheckingActivityEntity[]>> {
    const checkingActivity =
      await this.checkingActivityService.getCheckingActivityByPlanId(
        checkingPlanId,
      );

    if (!checkingActivity)
      throw new NotFoundException('Checking activity not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: checkingActivity,
    };
  }

  @Put('id/:id')
  public async updateCheckingActivity(
    @Param() { id }: GetCheckingActivityIdParamDTO,
    @Body() modifiedCheckingActivity: ModifyCheckingActivityBodyDTO,
  ): Promise<
    ResponseDTO<
      Omit<
        CheckingActivityEntity,
        'checkingPlan' | 'inspector' | 'inspectionActivity'
      >
    >
  > {
    const checkingActivity =
      await this.checkingActivityService.getCheckingActivityById(id);

    if (!checkingActivity)
      throw new NotFoundException('Checking activity not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.checkingActivityService.modifyCheckingActivity({
        ...checkingActivity,
        ...modifiedCheckingActivity,
      }),
    };
  }

  @Post()
  public async createCheckingActivity(
    @Body() newCheckingActivity: CreateCheckingActivityBodyDTO,
  ): Promise<ResponseDTO<CheckingActivityEntity>> {
    try {
      const checkingActivity =
        await this.checkingActivityService.createCheckingActivity(
          newCheckingActivity,
        );
      return {
        statusCode: HttpStatus.OK,
        message: [],
        errorCode: ErrorCodes.SUCCESS,
        body: checkingActivity,
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  @Delete('id/:id')
  public async deleteCheckingActivity(
    @Param() { id }: GetCheckingActivityIdParamDTO,
  ): Promise<ResponseDTO<CheckingActivityEntity>> {
    const checkingActivity =
      await this.checkingActivityService.getCheckingActivityById(id);

    if (!checkingActivity)
      throw new NotFoundException('Checking activity not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.checkingActivityService.deleteCheckingActivity(
        checkingActivity,
      ),
    };
  }
}
