import { Facility } from '@/view/common/types/Facility';
import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../ActionTypes';

export type FacilityDetails = {
  facility: Facility;
  editMode: boolean;
};

export const initialState: FacilityDetails = {
  facility: {
    id: 0,
    name: '',
    ownerName: '',
    phone: '',
    address: '',
    facilityLocationCode: 0,
    facilityTypeId: 1,
  },
  editMode: false,
};

export function reduce(
  state: FacilityDetails = initialState,
  action: AnyAction,
): FacilityDetails {
  switch (action.type) {
    case ActionTypes.FACILITY_DETAIL__SET_FACILITY:
      return { ...state, facility: action.payload };

    case ActionTypes.FACILITY_DETAIL__CHANGE_EDIT_MODE:
      return { ...state, editMode: action.payload };

    default:
      return state;
  }
}
