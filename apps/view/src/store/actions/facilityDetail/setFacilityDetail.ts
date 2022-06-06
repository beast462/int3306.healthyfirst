import { FacilityEntity } from '@/common/entities';
import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function setFacilityDetail(
  detail: FacilityEntity,
): AppThunkAction<Action<object>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.FACILITY_DETAIL__SET_FACILITY,
      payload: detail,
    });
  };
}
