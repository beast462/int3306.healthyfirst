import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'roles';

@Entity(TABLE_NAME)
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column('varchar', { name: 'name', length: 20 })
  name!: string;

  @Column('int', { name: 'level' })
  level!: number;

  @Column('text', { name: 'description' })
  description!: string;
}
