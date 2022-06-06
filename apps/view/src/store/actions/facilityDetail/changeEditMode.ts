import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function setFacilityDetail(
  state: boolean,
): AppThunkAction<Action<boolean>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.FACILITY_DETAIL__CHANGE_EDIT_MODE,
      payload: state,
    });
  };
}
