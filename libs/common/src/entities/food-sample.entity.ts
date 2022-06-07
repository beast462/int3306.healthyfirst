import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  MAX_EXAMINER_NAME_LENGTH,
  MAX_FOOD_SAMPLE_NAME_LENGTH,
} from '../entity-constraints/food-sample.entity-constraint';
import { CheckingActivityEntity } from './checking-activity.entity';
import { FacilityEntity } from './facility.entity';
import { InspectionUnitEntity } from './inspection-unit';

export const TABLE_NAME = 'food_sample';

@Entity(TABLE_NAME)
export class FoodSampleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    length: MAX_FOOD_SAMPLE_NAME_LENGTH,
  })
  name!: string;

  @Column('int', {
    nullable: false,
    name: 'activity_id',
    unsigned: true,
  })
  activityId!: number;

  @ManyToOne(() => CheckingActivityEntity, (activity) => activity.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'activity_id', referencedColumnName: 'id' })
  activity!: CheckingActivityEntity;

  @Column('date', { nullable: false, name: 'picked_at' })
  pickedAt!: Date;

  @Column('date', { nullable: false, name: 'receive_at' })
  receivedAt!: Date;

  @Column('double', { nullable: false, name: 'amount' })
  amount!: number;

  @Column('int', {
    nullable: false,
    name: 'facility_id',
    unsigned: true,
  })
  facilityId!: number;

  @ManyToOne(() => FacilityEntity, (facility) => facility.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'facility_id', referencedColumnName: 'id' })
  facility!: FacilityEntity;

  @Column('varchar', {
    nullable: false,
    name: 'examiner',
    length: MAX_EXAMINER_NAME_LENGTH,
  })
  examiner!: string;

  @Column('int', {
    nullable: false,
    name: 'inspector_id',
    unsigned: true,
  })
  inspectorId!: number;

  @ManyToOne(() => InspectionUnitEntity, (inspector) => inspector.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'inspector_id', referencedColumnName: 'id' })
  inspector!: InspectionUnitEntity;

  @Column('boolean', { nullable: false, name: 'passed' })
  passed!: boolean;
}
