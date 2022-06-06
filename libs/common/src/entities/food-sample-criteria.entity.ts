import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MAX_FOOD_SAMPLE_CRITERIA_NAME_LENGTH } from '../entity-constraints/food-sample-criteria.entity-constraint';

import { FoodSampleEntity } from './food-sample.entity';

export const TABLE_NAME = 'food_sample_criteria';

@Entity(TABLE_NAME)
export class FoodSampleCriteriaEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('int', {
    nullable: false,
    name: 'food_sample_id',
    unsigned: true,
  })
  foodSampleId!: number;

  @ManyToOne(() => FoodSampleEntity, (foodSample) => foodSample.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'food_sample_id', referencedColumnName: 'id' })
  foodSample!: FoodSampleEntity;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    length: MAX_FOOD_SAMPLE_CRITERIA_NAME_LENGTH,
  })
  name!: string;

  @Column('double', { nullable: false, name: 'result' })
  result!: number;

  @Column('double', { nullable: false, name: 'limit' })
  limit!: number;

  @Column('boolean', { nullable: false, name: 'passed' })
  passed!: boolean;
}
