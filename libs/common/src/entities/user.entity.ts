import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Column({ name: 'username', type: 'varchar', length: 32 })
  username!: string;

  @Column({ name: 'display_name', type: 'varchar', length: 64 })
  displayName!: string;

  @Column({ name: 'email', type: 'varchar', length: 64 })
  email!: string;

  @Column({ name: 'password', type: 'varchar', length: 64 })
  password!: string;

  @Column({ name: 'secret', type: 'varchar', length: 64 })
  secret!: string;

  @ManyToOne(() => RoleEntity, (role) => role.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role!: RoleEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
