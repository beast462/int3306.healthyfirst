import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetFoodSampleIdParamDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  id!: number;
}
