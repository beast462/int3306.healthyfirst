import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MAX_VIOLATION_DESCRIPTION_LENGTH } from '../entity-constraints/violation.entity-constraint';
import { FoodSampleCriteriaEntity } from './food-sample-criteria.entity';

export const TABLE_NAME = 'violations';

@Entity(TABLE_NAME)
export class ViolationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', {
    nullable: false,
    name: 'description',
    length: MAX_VIOLATION_DESCRIPTION_LENGTH,
  })
  description!: string;

  @Column('int', {
    nullable: false,
    name: 'food_sample_criteria_id',
    unsigned: true,
  })
  foodSampleCriteriaId!: number;

  @OneToOne(
    () => FoodSampleCriteriaEntity,
    (foodSampleCriteria) => foodSampleCriteria.id,
    {
      nullable: false,
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      eager: false,
    },
  )
  @JoinColumn({
    name: 'food_sample_criteria_id',
    referencedColumnName: 'id',
  })
  foodSampleCriteria!: FoodSampleCriteriaEntity;
}
