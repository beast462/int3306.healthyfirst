import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'locations';

@Entity(TABLE_NAME)
export class LocationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column('int', { name: 'code' })
  code!: number;

  @Column('varchar', { name: 'name', length: 30 })
  name!: string;

  @Column('varchar', { name: 'type', length: 30 })
  type!: string;
}
