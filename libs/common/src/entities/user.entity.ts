import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

export const TABLE_NAME = 'users';

@Entity(TABLE_NAME)
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
  @Exclude()
  password!: string;

  @Column({ name: 'secret', type: 'varchar', length: 64 })
  @Exclude()
  secret!: string;

  @Column('int', { name: 'role_id', nullable: false })
  roleId!: number;

  @ManyToOne(() => RoleEntity, (role) => role.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: RoleEntity;

  @Column('int', { name: 'creator_id', nullable: true })
  creatorId!: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  @Exclude()
  creator!: UserEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
