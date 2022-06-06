import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, Min } from 'class-validator';

export class ModifyCheckingPlanBodyDTO {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  id!: number;

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
