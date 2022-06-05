import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';
import { UserEntity } from './user.entity';

export const TABLE_NAME = 'responsible_area';

@Entity(TABLE_NAME)
export class ResponsibleAreaEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('int', {
    nullable: false,
    name: 'user_id',
    unsigned: true,
  })
  userId!: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user!: UserEntity;

  @Column('int', {
    nullable: false,
    name: 'responsible_location_code',
    unsigned: true,
  })
  responsibleLocationCode!: number;

  @ManyToOne(() => LocationEntity, (location) => location.code, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'responsible_location_code',
    referencedColumnName: 'code',
  })
  responsibleLocation!: LocationEntity;
}
