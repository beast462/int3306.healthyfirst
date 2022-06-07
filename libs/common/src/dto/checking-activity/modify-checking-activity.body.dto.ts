import { Type } from 'class-transformer';
import { IsDate, IsInt, IsPositive, Min } from 'class-validator';

export class ModifyCheckingActivityBodyDTO {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  id!: number;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  checkingPlanId!: number;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  checkedAt!: Date;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  inspectorId!: number;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  inspectionActivityId!: number;

  @IsInt()
  @Type(() => Number)
  passed!: number;
}
