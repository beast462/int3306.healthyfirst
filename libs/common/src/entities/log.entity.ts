import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  MAX_FINGERPRINT_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_SCOPE_LENGTH,
  MAX_SOURCE_LENGTH,
} from '../entity-constraints/log.entity-constraint';

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

  @Column('varchar', {
    nullable: false,
    name: 'scope',
    length: MAX_SCOPE_LENGTH,
  })
  scope!: string;

  @Column('varchar', {
    nullable: false,
    name: 'message',
    length: MAX_MESSAGE_LENGTH,
  })
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
    length: MAX_FINGERPRINT_LENGTH,
  })
  fingerprint!: string;

  @Column('varchar', {
    nullable: false,
    name: 'source',
    length: MAX_SOURCE_LENGTH,
  })
  source!: string;
}
