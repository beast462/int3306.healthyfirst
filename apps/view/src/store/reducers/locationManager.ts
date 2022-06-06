import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../ActionTypes';

export type ModifiedSpecialist = {
  userId: number;
  roleId: number;
  responsibleLocationCode: number;
};

export const initialState: ModifiedSpecialist = {
  userId: 0,
  roleId: 0,
  responsibleLocationCode: 0,
};

export function reduce(
  state: ModifiedSpecialist = initialState,
  action: AnyAction,
): ModifiedSpecialist {
  switch (action.type) {
    case ActionTypes.LOCATION_MANAGER__SET_MODIFIED_SPECIALIST:
      return action.payload;

    default:
      return state;
  }
}
