import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, IsString, Min } from 'class-validator';

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
  issuedDate!: Date;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  issueId!: number;

  @IsDate()
  expiredDate!: Date;

  @IsString()
  issuedBy!: string;
}
