import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_USERNAME_LENGTH,
  PASSWORD_HASH_BITS,
} from '../entity-constraints/user.entity-constraint';
import { RoleEntity } from './role.entity';

export const TABLE_NAME = 'users';

@Entity(TABLE_NAME)
export class UserEntity {
  @Min(1)
  @IsInt()
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id!: number;

  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @IsString()
  @IsOptional()
  @Column({ name: 'username', type: 'varchar', length: MAX_USERNAME_LENGTH })
  username!: string;

  @Length(MIN_DISPLAY_NAME_LENGTH, MAX_DISPLAY_NAME_LENGTH)
  @IsString()
  @IsOptional()
  @Column({
    name: 'display_name',
    type: 'varchar',
    length: MAX_DISPLAY_NAME_LENGTH,
  })
  displayName!: string;

  @Length(MIN_EMAIL_LENGTH, MAX_EMAIL_LENGTH)
  @IsEmail()
  @IsString()
  @IsOptional()
  @Column({ name: 'email', type: 'varchar', length: MAX_EMAIL_LENGTH })
  email!: string;

  @Column({ name: 'password', type: 'varchar', length: PASSWORD_HASH_BITS / 4 })
  @Exclude()
  password!: string;

  @Column({ name: 'secret', type: 'varchar', length: PASSWORD_HASH_BITS / 4 })
  @Exclude()
  secret!: string;

  @Min(1)
  @IsInt()
  @IsNumber()
  @IsOptional()
  @Column('int', { name: 'role_id', nullable: false })
  roleId!: number;

  @ManyToOne(() => RoleEntity, (role) => role.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  @Exclude({ toPlainOnly: true })
  role!: RoleEntity;

  @Min(1)
  @IsInt()
  @IsNumber()
  @IsOptional()
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

  @IsDate()
  @IsOptional()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
