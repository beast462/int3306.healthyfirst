import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckingPlanEntity } from './checking-plan.entity';
import { UserEntity } from './user.entity';
import { PurposeEntity } from './purpose.entity';

export const TABLE_NAME = 'checking_activity';

@Entity(TABLE_NAME)
export class CheckingActivityEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('int', {
    nullable: false,
    name: 'checking_plan_id',
    unsigned: true,
  })
  checkingPlanId!: number;

  @ManyToOne(() => CheckingPlanEntity, (checkingPlan) => checkingPlan.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'checking_plan_id', referencedColumnName: 'id' })
  checkingPlan!: CheckingPlanEntity;

  @Column('date', { nullable: false, name: 'created_at' })
  createdAt!: Date;

  @Column('date', { nullable: false, name: 'checked_at' })
  checkedAt!: Date;

  @Column('int', {
    nullable: false,
    name: 'inspector_id',
    unsigned: true,
  })
  inspectorId!: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'inspector_id', referencedColumnName: 'id' })
  inspector!: UserEntity;

  @Column('int', {
    nullable: false,
    name: 'inspection_activity',
    unsigned: true,
  })
  inspectionActivityId!: number;

  @OneToOne(() => PurposeEntity, (purpose) => purpose.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'inspection_activity', referencedColumnName: 'id' })
  inspectionActivity!: PurposeEntity;

  @Column('tinyint', { nullable: false, name: 'passed', unsigned: true })
  passed!: number;
}
