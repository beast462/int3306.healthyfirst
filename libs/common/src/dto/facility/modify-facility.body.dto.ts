import { Type } from 'class-transformer';
import {
  IsInt,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class ModifyFacilityBodyDTO {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  ownerName!: string;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  facilityTypeId!: number;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  facilityLocationCode!: number;

  @IsString()
  address!: string;

  @IsPhoneNumber('VN')
  @IsString()
  phone!: string;
}
