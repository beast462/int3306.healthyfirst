import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, IsString, Min } from 'class-validator';

export class CreateFoodSampleBodyDTO {
  @IsString()
  name!: string;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  activityId!: number;

  @IsDate()
  pickedAt!: Date;

  @IsDate()
  receivedAt!: Date;

  @Type(() => Number)
  amount!: number;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  facilityId!: number;

  @IsString()
  examiner!: string;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  inspectorId!: number;

  @IsInt()
  @Type(() => Number)
  passed!: number;
}
