import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'facility_types';

@Entity(TABLE_NAME)
export class FacilityTypeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('text', {
    nullable: false,
    name: 'name',
  })
  name!: string;
}
