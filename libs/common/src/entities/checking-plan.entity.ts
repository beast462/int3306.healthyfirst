import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FacilityEntity } from './facility.entity';

export const TABLE_NAME = 'checking_plan';

@Entity(TABLE_NAME)
export class CheckingPlanEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('date', { nullable: false, name: 'created_at' })
  createdAt!: Date;

  @Column('date', { nullable: false, name: 'checked_at' })
  checkedAt!: Date;

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
}
