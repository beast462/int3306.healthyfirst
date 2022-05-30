import { UserEntity } from '@/common/entities';

export class GetUserCreationsResDTO {
  total: number;
  limit: number;
  offset: number;
  creations: UserEntity[];
}
