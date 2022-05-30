import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

import { PublicUser } from '@/common/models/public-user';
import { SortOrders } from '@/common/types/sort-orders';

export class GetUserCreationsQueryDTO {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @Min(0)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  offset: number;

  @IsEnum(SortOrders)
  @IsOptional()
  order: SortOrders;

  @IsEnum(['id', 'username', 'email', 'displayName', 'roleId', 'createdAt'])
  @IsOptional()
  orderBy: keyof PublicUser;
}
