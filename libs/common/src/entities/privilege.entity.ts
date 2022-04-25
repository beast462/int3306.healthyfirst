import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privileges')
export class PrivilegeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column({ name: 'role', type: 'varchar', length: 20 })
  role!: string;

  @Column({ name: 'level', type: 'int' })
  level!: number;
}
