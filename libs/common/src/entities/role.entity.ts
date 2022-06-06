import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const TABLE_NAME = 'roles';

@Entity(TABLE_NAME)
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('varchar', { nullable: false, name: 'name', length: 20 })
  name!: string;

  @Column('int', { nullable: false, name: 'level' })
  level!: number;

  @Column('text', { nullable: false, name: 'description' })
  description!: string;
}
