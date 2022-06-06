import { IsDate, IsOptional } from 'class-validator';

export class GetQualifiedQueryDTO {
  @IsDate()
  @IsOptional()
  date: Date;
}
