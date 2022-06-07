import { CheckingPlanEntity } from '@/common/entities';
import { Facility } from './Facility';

export type Plan = Facility & CheckingPlanEntity;
