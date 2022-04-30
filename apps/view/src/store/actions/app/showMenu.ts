import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function showMenu(): AppThunkAction<Action<boolean>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.APP__CHANGE_MENU_STATE,
      payload: true,
    });
  };
}
