import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function setCreateMode(state: {
  canCreate: boolean;
  facilityId: number;
}): AppThunkAction<Action<object>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CREATE_PLAN__SET_CREATE_MODE,
      payload: state,
    });
  };
}
