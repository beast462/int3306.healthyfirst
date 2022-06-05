import { FoodSafetyAuthorityBranchEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FoodSafetyAuthorityBranchService {
  constructor(
    @InjectRepository(FoodSafetyAuthorityBranchEntity)
    private readonly fsaBranchRepository: Repository<FoodSafetyAuthorityBranchEntity>,
  ) {}

  public async getAllFSABranchs(): Promise<FoodSafetyAuthorityBranchEntity[]> {
    return this.fsaBranchRepository.find();
  }

  public async getFSABranchById(
    id: number,
  ): Promise<FoodSafetyAuthorityBranchEntity> {
    return this.fsaBranchRepository.findOne({
      where: { id: id },
    });
  }

  public async deleteFSABranch(
    removedFSABranch: FoodSafetyAuthorityBranchEntity,
  ): Promise<FoodSafetyAuthorityBranchEntity> {
    await this.fsaBranchRepository.remove(removedFSABranch);
    return removedFSABranch;
  }
}
