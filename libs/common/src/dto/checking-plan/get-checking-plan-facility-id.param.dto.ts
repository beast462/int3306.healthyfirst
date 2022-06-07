import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetCheckingPlanFacilityIdParamDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  facilityId!: number;
}
