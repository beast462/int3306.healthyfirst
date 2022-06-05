import { UserEntity } from '@/common/entities';

export class GetManagedSpecialistsResDTO {
  total: number;
  creations: UserEntity[];
}
