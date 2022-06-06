import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, Min } from 'class-validator';

export class CreateCheckingPlanBodyDTO {
  @IsDate()
  createdAt!: Date;

  @IsDate()
  checkedAt!: Date;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  facilityId!: number;
}
