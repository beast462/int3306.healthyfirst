import { Type } from 'class-transformer';
import { IsDefined, IsInt, Min } from 'class-validator';

export class GetResponsibleAreaLocationCodeDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  responsibleLocationCode!: number;
}
