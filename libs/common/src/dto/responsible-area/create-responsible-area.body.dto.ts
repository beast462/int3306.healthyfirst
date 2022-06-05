import { Type } from 'class-transformer';
import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateResponsibleAreaBodyDTO {
  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  userId!: number;

  @Min(1)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  responsibleLocationCode!: number;
}
