import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetFacilityLocationCodeParamDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  facilityLocationCode!: number;
}
