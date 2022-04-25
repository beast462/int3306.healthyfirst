import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrivilegeEntity } from './privilege.entity';

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

  @Column({ name: 'privilege_id', type: 'int' })
  @ManyToOne(() => PrivilegeEntity, (privilege) => privilege.id)
  privilege!: PrivilegeEntity;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;
}
