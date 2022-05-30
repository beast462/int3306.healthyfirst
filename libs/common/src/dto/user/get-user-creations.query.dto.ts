import { IsInt, IsOptional, Min } from 'class-validator';

export class GetUserCreationsQueryDTO {
  @Min(1)
  @IsInt()
  @IsOptional()
  limit: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  offset: number;
}
