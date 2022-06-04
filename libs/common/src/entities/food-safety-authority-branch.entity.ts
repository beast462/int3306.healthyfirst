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
  MAX_EMAIL_LENGTH,
  MAX_PHONE_LENGTH,
} from '../entity-constraints/common.entity-constraint';
import {
  MAX_FAX_LENGTH,
  MAX_WEBSITE_LENGTH,
} from '../entity-constraints/food-safety-authority-branch.entity-constraint';
import { LocationEntity } from './location.entity';

export const TABLE_NAME = 'fsa_branches';

@Entity(TABLE_NAME)
export class FoodSafetyAuthorityBranchEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('int', {
    nullable: false,
    name: 'responsible_location_code',
    unsigned: true,
  })
  responsibleLocationCode!: number;

  @ManyToOne(() => LocationEntity, (location) => location.code, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'responsible_location_code',
    referencedColumnName: 'code',
  })
  responsibleLocation!: LocationEntity;

  @Column('varchar', {
    nullable: false,
    name: 'address',
    length: MAX_ADDRESS_LENGTH,
  })
  address!: string;

  @Column('varchar', {
    nullable: false,
    name: 'email',
    length: MAX_EMAIL_LENGTH,
  })
  email!: string;

  @IsPhoneNumber('VN')
  @Column('varchar', {
    nullable: false,
    name: 'phone',
    length: MAX_PHONE_LENGTH,
  })
  phone!: string;

  @Column('varchar', {
    nullable: false,
    name: 'website',
    length: MAX_WEBSITE_LENGTH,
  })
  website!: string;

  @Column('varchar', { nullable: false, name: 'fax', length: MAX_FAX_LENGTH })
  fax!: string;
}
