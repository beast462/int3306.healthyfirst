import { UserEntity } from '@/common/entities';

export class GetUserCreationsResDTO {
  total: number;
  creations: UserEntity[];
}
