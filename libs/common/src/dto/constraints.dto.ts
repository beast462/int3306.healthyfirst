import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

import { SortOrders } from '../types/sort-orders';

export class Constraints {
  @Min(1)
  @IsInt()
  @IsOptional()
  limit: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  offset: number;

  @IsEnum(SortOrders)
  @IsOptional()
  order: SortOrders;

  @IsString()
  @ValidateIf((o) => o.order)
  orderBy: string;
}

export class ConstraintsDTO {
  @Type(() => Constraints)
  constraints: Constraints;
}
