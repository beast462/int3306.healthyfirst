import { ErrorCodes } from '@/common/constants/error-codes';
import { GetFSABranchParamDTO } from '@/common/dto/fsabranch/get-fsa-branch.dto';
import { ResponseDTO } from '@/common/dto/response.dto';
import { FoodSafetyAuthorityBranchEntity } from '@/common/entities';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FoodSafetyAuthorityBranchService } from './food-safety-authority-branch.service';

@Controller('api/fsab')
export class FoodSafetyAuthorityBranchController {
  constructor(
    private readonly foodSafetyAuthorityBranchService: FoodSafetyAuthorityBranchService,
  ) {}

  @Get()
  public async getAllFSABranchs(): Promise<
    ResponseDTO<FoodSafetyAuthorityBranchEntity[]>
  > {
    const fsaBranchs =
      await this.foodSafetyAuthorityBranchService.getAllFSABranchs();
    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully fetched all Food Safety Authority Branchs'],
      errorCode: ErrorCodes.SUCCESS,
      body: fsaBranchs,
    };
  }

  @Get(':id')
  public async getFSABranchById(
    @Param() { id }: GetFSABranchParamDTO,
  ): Promise<ResponseDTO<FoodSafetyAuthorityBranchEntity>> {
    const fsaBranch =
      await this.foodSafetyAuthorityBranchService.getFSABranchById(id);

    if (!fsaBranch) throw new NotFoundException('FSABranch not found');

    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully fetched Food Safety Authority Branch'],
      errorCode: ErrorCodes.SUCCESS,
      body: fsaBranch,
    };
  }

  @Delete(':id')
  public async deleteFSABranch(
    @Param() { id }: GetFSABranchParamDTO,
  ): Promise<ResponseDTO<FoodSafetyAuthorityBranchEntity>> {
    const fsaBranch =
      await this.foodSafetyAuthorityBranchService.getFSABranchById(id);

    if (!fsaBranch) throw new NotFoundException('FSABranch not found');

    return {
      statusCode: HttpStatus.OK,
      message: ['Successfully deleted Food Safety Authority Branch'],
      errorCode: ErrorCodes.SUCCESS,
      body: await this.foodSafetyAuthorityBranchService.deleteFSABranch(
        fsaBranch,
      ),
    };
  }
}
