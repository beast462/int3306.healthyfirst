import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetFacilityParamDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  id!: number;
}
