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
import { createHash } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import {
  MAX_EMAIL_LENGTH,
  MIN_EMAIL_LENGTH,
} from '../entity-constraints/common.entity-constraint';
import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
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
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH)
  @IsString()
  @IsOptional()
  @Column('varchar', {
    nullable: false,
    name: 'username',
    length: MAX_USERNAME_LENGTH,
  })
  username!: string;

  @Length(MIN_DISPLAY_NAME_LENGTH, MAX_DISPLAY_NAME_LENGTH)
  @IsString()
  @IsOptional()
  @Column('varchar', {
    nullable: false,
    name: 'display_name',
    length: MAX_DISPLAY_NAME_LENGTH,
  })
  displayName!: string;

  @Length(MIN_EMAIL_LENGTH, MAX_EMAIL_LENGTH)
  @IsEmail()
  @IsString()
  @IsOptional()
  @Column('varchar', {
    nullable: false,
    name: 'email',
    length: MAX_EMAIL_LENGTH,
  })
  email!: string;

  @Exclude()
  @Column('varchar', {
    nullable: false,
    name: 'password',
    length: PASSWORD_HASH_BITS / 4,
  })
  password!: string;

  @Exclude()
  @Column('varchar', {
    nullable: false,
    name: 'secret',
    length: PASSWORD_HASH_BITS / 4,
  })
  secret: string = createHash('sha256').update(v4()).digest('hex');

  @Min(1)
  @IsInt()
  @IsNumber()
  @IsOptional()
  @Column('int', { nullable: false, name: 'role_id', unsigned: true })
  roleId!: number;

  @Exclude({ toClassOnly: true })
  @ManyToOne(() => RoleEntity, (role) => role.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: RoleEntity;

  @Min(1)
  @IsInt()
  @IsNumber()
  @IsOptional()
  @Column('int', { nullable: true, name: 'creator_id', unsigned: true })
  creatorId!: number;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  creator!: UserEntity;

  @IsDate()
  @IsOptional()
  @Column('timestamp', {
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
