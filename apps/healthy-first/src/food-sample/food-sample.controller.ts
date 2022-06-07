import { ErrorCodes } from '@/common/constants/error-codes';
import { CreateFoodSampleBodyDTO } from '@/common/dto/food-sample/create-food-sample.body.dto';
import { GetFoodSampleIdParamDTO } from '@/common/dto/food-sample/get-food-sample-id.param.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FoodSampleEntity } from '@/common/entities';
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
import { FoodSampleService } from './food-sample.service';

@Controller('api/food-sample')
export class FoodSampleController {
  constructor(private readonly foodSampleService: FoodSampleService) {}

  @Get()
  public async getAllFoodSamples(): Promise<ResponseDTO<FoodSampleEntity[]>> {
    const foodSamples = await this.foodSampleService.getAllFoodSamples();

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: foodSamples,
    };
  }

  @Get('id/:id')
  public async getFoodSampleById(
    @Param() { id }: GetFoodSampleIdParamDTO,
  ): Promise<ResponseDTO<FoodSampleEntity>> {
    const foodSample = await this.foodSampleService.getFoodSampleById(id);

    if (!foodSample) throw new NotFoundException('FoodSample not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: foodSample,
    };
  }

  @Post()
  public async createFoodSample(
    @Body() newFoodSample: CreateFoodSampleBodyDTO,
  ): Promise<ResponseDTO<FoodSampleEntity>> {
    try {
      const foodSample = await this.foodSampleService.createFoodSample(
        newFoodSample,
      );

      return {
        statusCode: HttpStatus.OK,
        message: [],
        errorCode: ErrorCodes.SUCCESS,
        body: foodSample,
      };
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  @Delete('id/:id')
  public async deleteFoodSample(
    @Param() { id }: GetFoodSampleIdParamDTO,
  ): Promise<ResponseDTO<FoodSampleEntity>> {
    const foodSample = await this.foodSampleService.getFoodSampleById(id);

    if (!foodSample) throw new NotFoundException('FoodSample not found');

    return {
      statusCode: HttpStatus.OK,
      message: [],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.foodSampleService.deleteFoodSample(foodSample),
    };
  }
}
