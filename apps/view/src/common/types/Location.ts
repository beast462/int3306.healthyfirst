import { LocationEntity } from '@/common/entities';

export type Location = Partial<Omit<LocationEntity, 'id' | 'type'>>;
