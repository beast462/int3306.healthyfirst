import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MAX_FACILITY_TYPE_NAME_LENGTH } from '../entity-constraints/facility-type.entity-constraint';

export const TABLE_NAME = 'facility_types';

@Entity(TABLE_NAME)
export class FacilityTypeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    length: MAX_FACILITY_TYPE_NAME_LENGTH,
  })
  name!: string;
}
