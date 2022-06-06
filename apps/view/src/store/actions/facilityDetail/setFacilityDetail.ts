import { FacilityDetails } from '../../reducers/facilityDetail';
import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function setFacilityDetail(
  detail: FacilityDetails,
): AppThunkAction<Action<object>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.FACILITY_DETAIL__SET_FACILITY,
      payload: detail,
    });
  };
}
