import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MAX_ISSUED_BY_NAME_LENGTH } from '../entity-constraints/certificate.entity-constraint';
import { FacilityEntity } from './facility.entity';

export const TABLE_NAME = 'certificates';

@Entity(TABLE_NAME)
export class CertificateEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id!: number;

  @Column('int', {
    nullable: false,
    name: 'facility_id',
    unsigned: true,
  })
  facilityId!: number;

  @OneToOne(() => FacilityEntity, (facility) => facility.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'facility_id', referencedColumnName: 'id' })
  facility!: FacilityEntity;

  @Column('tinyint', { nullable: false, name: 'revoked' })
  revoked!: number;

  @Column('date', { nullable: false, name: 'issued_date' })
  issuedDate!: Date;

  @Column('int', {
    nullable: false,
    name: 'issue_id',
    unsigned: true,
  })
  issueId!: number;

  @Column('date', { nullable: false, name: 'expired_date' })
  expiredDate!: Date;

  @Column('varchar', {
    nullable: false,
    name: 'issued_by',
    length: MAX_ISSUED_BY_NAME_LENGTH,
  })
  issuedBy!: string;
}
