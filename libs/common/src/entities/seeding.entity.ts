import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'seedings';

@Entity(TABLE_NAME)
export class SeedingEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', { name: 'name', length: 20 })
  name!: string;
}
