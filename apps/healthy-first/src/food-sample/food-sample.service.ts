import { FoodSampleEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FoodSampleService {
  constructor(
    @InjectRepository(FoodSampleEntity)
    private readonly foodSampleRepository: Repository<FoodSampleEntity>,
  ) {}

  public async getAllFoodSamples(): Promise<FoodSampleEntity[]> {
    return this.foodSampleRepository.find();
  }

  public async getFoodSampleById(id: number): Promise<FoodSampleEntity> {
    return this.foodSampleRepository.findOne({
      where: { id: id },
    });
  }

  public async createFoodSample(
    newFoodSample: Omit<
      FoodSampleEntity,
      'id' | 'activity' | 'facility' | 'inspector'
    >,
  ): Promise<FoodSampleEntity> {
    return (await this.foodSampleRepository.insert(newFoodSample))
      .generatedMaps[0] as FoodSampleEntity;
  }

  public async deleteFoodSample(
    removedFoodSample: FoodSampleEntity,
  ): Promise<FoodSampleEntity> {
    await this.foodSampleRepository.remove(removedFoodSample);
    return removedFoodSample;
  }
}
