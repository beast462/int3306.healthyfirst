import { FacilityEntity } from '@/common/entities';
import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../ActionTypes';

export type FacilityDetails = {
  facility: FacilityEntity;
};

export const initialState: FacilityDetails = {
  facility: {
    id: 0,
    name: '',
    ownerName: '',
    phone: '',
    address: '',
    facilityLocationCode: 0,
    facilityTypeId: 0,
  },
};

export function reduce(
  state: FacilityDetails = initialState,
  action: AnyAction,
): FacilityDetails {
  switch (action.type) {
    case ActionTypes.FACILITY_DETAIL__SET_FACILITY:
      return action.payload;

    default:
      return state;
  }
}
