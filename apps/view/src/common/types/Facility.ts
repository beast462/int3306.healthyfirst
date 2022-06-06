import { FacilityEntity } from '@/common/entities';

export type Facility = Partial<
  Omit<FacilityEntity, 'facilityType' | 'facilityLocation'>
>;
