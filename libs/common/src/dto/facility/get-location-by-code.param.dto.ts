import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetFacilityLocationByCodeParamDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  locationCode!: number;
}
