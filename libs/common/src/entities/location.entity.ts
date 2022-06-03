import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'locations';

@Entity(TABLE_NAME)
export class LocationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column({ name: 'code', type: 'int' })
  code!: number;

  @Column({ name: 'name', type: 'string' })
  name!: string;

  @Column({ name: 'type', type: 'string' })
  type!: string;
}
