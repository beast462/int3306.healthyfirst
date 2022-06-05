import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MAX_VIOLATION_DESCRIPTION_LENGTH } from '../entity-constraints/violation.entity-constraint';

export const TABLE_NAME = 'violation';

@Entity(TABLE_NAME)
export class ViolationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', {
    nullable: false,
    name: 'description',
    length: MAX_VIOLATION_DESCRIPTION_LENGTH,
  })
  description!: string;
}
