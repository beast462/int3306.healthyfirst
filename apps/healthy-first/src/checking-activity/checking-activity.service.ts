import { CheckingActivityEntity } from '@/common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckingActivityService {
  constructor(
    @InjectRepository(CheckingActivityEntity)
    private readonly checkingActivityRepository: Repository<CheckingActivityEntity>,
  ) {}

  public async getAllCheckingActivities(): Promise<CheckingActivityEntity[]> {
    return this.checkingActivityRepository.find();
  }

  public async getCheckingActivityById(
    id: number,
  ): Promise<CheckingActivityEntity> {
    return this.checkingActivityRepository.findOne({
      where: { id: id },
    });
  }

  public async getCheckingActivityByPlanId(
    checkingPlanId: number,
  ): Promise<CheckingActivityEntity[]> {
    return this.checkingActivityRepository.find({
      where: { checkingPlanId: checkingPlanId },
    });
  }

  public async modifyCheckingActivity(
    modifiedCheckingActivity: Omit<
      CheckingActivityEntity,
      'checkingPlan' | 'inspector' | 'inspectionActivity'
    >,
  ): Promise<
    Omit<
      CheckingActivityEntity,
      'checkingPlan' | 'inspector' | 'inspectionActivity'
    >
  > {
    await this.checkingActivityRepository.update(
      { id: modifiedCheckingActivity.id },
      modifiedCheckingActivity,
    );

    return modifiedCheckingActivity;
  }

  public async createCheckingActivity(
    newCheckingActivity: Omit<
      CheckingActivityEntity,
      'id' | 'checkingPlan' | 'inspector' | 'inspectionActivity'
    >,
  ): Promise<CheckingActivityEntity> {
    return (await this.checkingActivityRepository.insert(newCheckingActivity))
      .generatedMaps[0] as CheckingActivityEntity;
  }

  public async deleteCheckingActivity(
    removedCheckingActivity: CheckingActivityEntity,
  ): Promise<CheckingActivityEntity> {
    await this.checkingActivityRepository.remove(removedCheckingActivity);
    return removedCheckingActivity;
  }
}
