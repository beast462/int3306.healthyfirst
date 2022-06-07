import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'purpose';

@Entity(TABLE_NAME)
export class PurposeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('text', {
    nullable: false,
    name: 'name',
  })
  name!: string;
}
