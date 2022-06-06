import { IsPhoneNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  MAX_ADDRESS_LENGTH,
  MAX_PHONE_LENGTH,
} from '../entity-constraints/common.entity-constraint';
import {
  MAX_FACILITY_NAME_LENGTH,
  MAX_OWNER_NAME_LENGTH,
} from '../entity-constraints/facility.entitty-constraint';
import { FacilityTypeEntity } from './facility-type.entity';
import { LocationEntity } from './location.entity';

export const TABLE_NAME = 'facilities';

@Entity(TABLE_NAME)
export class FacilityEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    length: MAX_FACILITY_NAME_LENGTH,
  })
  name!: string;

  @Column('varchar', {
    nullable: false,
    name: 'owner_name',
    length: MAX_OWNER_NAME_LENGTH,
  })
  ownerName!: string;

  @Column('int', {
    nullable: false,
    name: 'facility_type_id',
    unsigned: true,
  })
  facilityTypeId!: number;

  @ManyToOne(() => FacilityTypeEntity, (facilityType) => facilityType.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'facility_type_id',
    referencedColumnName: 'id',
  })
  facilityType!: FacilityTypeEntity;

  @Column('int', {
    nullable: false,
    name: 'facility_location_code',
    unsigned: true,
  })
  facilityLocationCode!: number;

  @ManyToOne(() => LocationEntity, (location) => location.code, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'facility_location_code',
    referencedColumnName: 'code',
  })
  facilityLocation!: LocationEntity;

  @Column('varchar', {
    nullable: false,
    name: 'address',
    length: MAX_ADDRESS_LENGTH,
  })
  address!: string;

  @IsPhoneNumber('VN')
  @Column('varchar', {
    nullable: false,
    name: 'phone',
    length: MAX_PHONE_LENGTH,
  })
  phone!: string;
}
