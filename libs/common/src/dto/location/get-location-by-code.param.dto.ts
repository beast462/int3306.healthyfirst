import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetLocationByCodeParamDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  code!: number;
}
