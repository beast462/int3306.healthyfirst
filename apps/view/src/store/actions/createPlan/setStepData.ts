import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function setStepData(stepDate: {
  step: string;
  data: {
    startDate: Date;
    endDate: Date;
  };
}): AppThunkAction<Action<object>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CREATE_PLAN__SET_STEP_DATA,
      payload: stepDate,
    });
  };
}
