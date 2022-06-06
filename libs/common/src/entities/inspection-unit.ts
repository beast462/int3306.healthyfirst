import { IsPhoneNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {
  MAX_ADDRESS_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_FAX_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_WEBSITE_LENGTH,
} from '../entity-constraints/common.entity-constraint';

export const TABLE_NAME = 'inspection_unit';

@Entity(TABLE_NAME)
export class InspectionUnitEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

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
