import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum LogTypes {
  FATAL = 0,
  ERROR = 1,
  WARNING = 2,
  LOG = 3,
  VERBOSE = 4,
  DEBUG = 5,
}

export const LogTypesSet = new Set([
  'FATAL',
  'ERROR',
  'WARNING',
  'LOG',
  'VERBOSE',
  'DEBUG',
]);

export const TABLE_NAME = 'logs';

@Entity(TABLE_NAME)
export class LogEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id!: number;

  @Column('enum', {
    nullable: false,
    name: 'type',
    enum: LogTypes,
    default: LogTypes.LOG,
  })
  type!: number;

  @Column('varchar', { nullable: false, name: 'scope', length: 20 })
  scope!: string;

  @Column('varchar', { nullable: false, name: 'message', length: 64 })
  message!: string;

  @Column('text', { nullable: false, name: 'stack' })
  stack!: string;

  @Column('text', { nullable: false, name: 'detail' })
  detail!: string;

  @Column('timestamp', {
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column('varchar', {
    nullable: false,
    name: 'fingerprint',
    length: 128,
  })
  fingerprint!: string;

  @Column('varchar', { nullable: false, name: 'source', length: 20 })
  source!: string;
}
