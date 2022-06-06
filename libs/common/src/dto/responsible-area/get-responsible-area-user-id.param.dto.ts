import { Type } from 'class-transformer';
import { IsInt, IsPositive, Min } from 'class-validator';

export class GetResponsibleAreaUserIdParamDTO {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  userId!: number;
}
