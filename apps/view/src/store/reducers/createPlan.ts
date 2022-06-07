import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../ActionTypes';

export type CreatePlanState = {
  canCreate: boolean;
  facilityId: number;
  firstStepDate: {
    startDate: Date;
    endDate: Date;
  };
  secondStepDate: {
    startDate: Date;
    endDate: Date;
  };
  thirdStepDate: {
    startDate: Date;
    endDate: Date;
  };
};

export const initialState: CreatePlanState = {
  canCreate: false,
  facilityId: 0,
  firstStepDate: {
    startDate: new Date(),
    endDate: new Date(),
  },
  secondStepDate: {
    startDate: new Date(),
    endDate: new Date(),
  },
  thirdStepDate: {
    startDate: new Date(),
    endDate: new Date(),
  },
};

export function reduce(
  state: CreatePlanState = initialState,
  action: AnyAction,
): CreatePlanState {
  switch (action.type) {
    case ActionTypes.CREATE_PLAN__SET_CREATE_MODE:
      return {
        ...state,
        canCreate: action.payload.canCreate,
        facilityId: action.payload.facilityId,
      };

    case ActionTypes.CREATE_PLAN__SET_STEP_DATA:
      return { ...state, [action.payload.step]: action.payload.data };

    default:
      return state;
  }
}
