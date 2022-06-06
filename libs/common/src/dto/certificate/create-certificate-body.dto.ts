import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCertificateBodyDTO {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  facilityId!: number;

  @IsInt()
  @Type(() => Number)
  revoked!: number;

  @IsDate()
  //@IsISO8601({ strict: true })
  issuedDate!: Date;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  issueId!: number;

  @IsDate()
  //@IsDateString({ strict: true })
  expiredDate!: Date;

  @IsString()
  issuedBy!: string;
}
