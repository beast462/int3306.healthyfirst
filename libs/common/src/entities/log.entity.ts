import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum LogTypes {
  ERROR = 0,
  WARNING = 1,
  LOG = 2,
  VERBOSE = 3,
  DEBUG = 4,
}

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: number;

  @Column('enum', {
    name: 'type',
    enum: LogTypes,
    default: LogTypes.LOG,
    nullable: false,
  })
  type!: number;

  @Column('varchar', { name: 'scope', length: 20, nullable: false })
  scope!: string;

  @Column('varchar', { name: 'message', length: 64, nullable: false })
  message!: string;

  @Column('text', { name: 'stack' })
  stack!: string;

  @Column('text', { name: 'detail' })
  detail!: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column('varchar', {
    name: 'fingerprint',
    nullable: false,
    length: 128,
  })
  fingerprint!: string;

  @Column('varchar', { name: 'source', length: 20, nullable: false })
  source!: string;
}
