import { ModifiedSpecialist } from './../../reducers/locationManager';
import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function setModifiedSpecialist(
  specialist: ModifiedSpecialist,
): AppThunkAction<Action<object>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.LOCATION_MANAGER__SET_MODIFIED_SPECIALIST,
      payload: specialist,
    });
  };
}
