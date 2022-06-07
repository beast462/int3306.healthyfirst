import { CheckingPlanEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class CheckingPlanService {
  constructor(
    @InjectRepository(CheckingPlanEntity)
    private readonly checkingPlanRepository: Repository<CheckingPlanEntity>,
  ) {}

  public async getAllCheckingPlans(): Promise<CheckingPlanEntity[]> {
    return this.checkingPlanRepository.find();
  }

  public async getCheckingPlanById(id: number): Promise<CheckingPlanEntity> {
    return this.checkingPlanRepository.findOne({
      where: { id: id },
    });
  }

  public async getCheckingPlanByFacilityId(
    facilityId: number,
  ): Promise<CheckingPlanEntity[]> {
    return this.checkingPlanRepository.find({
      where: {
        facilityId: facilityId,
        checkedAt: Raw((alias) => `${alias} > curdate()`),
      },
    });
  }

  public async modifyCheckingPlan(
    modifiedCheckingPlan: Omit<CheckingPlanEntity, 'facility'>,
  ): Promise<Omit<CheckingPlanEntity, 'facility'>> {
    await this.checkingPlanRepository.update(
      { id: modifiedCheckingPlan.id },
      modifiedCheckingPlan,
    );

    return modifiedCheckingPlan;
  }

  public async createCheckingPlan(
    checkingPlan: Omit<CheckingPlanEntity, 'id' | 'facility'>,
  ): Promise<CheckingPlanEntity> {
    return (await this.checkingPlanRepository.insert(checkingPlan))
      .generatedMaps[0] as CheckingPlanEntity;
  }

  public async deleteCheckingPlan(
    removedCheckingPlan: CheckingPlanEntity,
  ): Promise<CheckingPlanEntity> {
    await this.checkingPlanRepository.remove(removedCheckingPlan);
    return removedCheckingPlan;
  }
}
