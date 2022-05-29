import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function changeRpp(
  rowsPerPage: number,
): AppThunkAction<Action<number>, unknown> {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.ACCOUNT_TABLE__SET_RPP,
      payload: rowsPerPage,
    });
}
