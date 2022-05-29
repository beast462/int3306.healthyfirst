import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function changePage(
  page: number,
): AppThunkAction<Action<number>, unknown> {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.ACCOUNT_TABLE__SET_PAGE,
      payload: page,
    });
}
