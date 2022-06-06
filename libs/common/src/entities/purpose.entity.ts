import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MAX_PURPOSE_NAME_LENGTH } from '../entity-constraints/purpose.entity-constraint';

export const TABLE_NAME = 'purpose';

@Entity(TABLE_NAME)
export class PurposeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
    length: MAX_PURPOSE_NAME_LENGTH,
  })
  name!: string;
}
