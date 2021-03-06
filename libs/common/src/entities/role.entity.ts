import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'roles';

@Entity(TABLE_NAME)
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column({ name: 'name', type: 'varchar', length: 20 })
  name!: string;

  @Column({ name: 'level', type: 'int' })
  level!: number;

  @Column({ name: 'description', type: 'text' })
  description!: string;
}
