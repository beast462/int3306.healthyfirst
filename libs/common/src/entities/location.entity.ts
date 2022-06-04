import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'locations';

@Entity(TABLE_NAME)
export class LocationEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('int', {
    nullable: false,
    name: 'code',
    unique: true,
    unsigned: true,
  })
  code!: number;

  @Column('varchar', { nullable: false, name: 'name', length: 30 })
  name!: string;

  @Column('varchar', { nullable: false, name: 'type', length: 30 })
  type!: string;
}
