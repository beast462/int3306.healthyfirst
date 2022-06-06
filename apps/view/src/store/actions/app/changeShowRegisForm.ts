import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from './../../store';

export function changeShowRegisForm(
  show: boolean,
): AppThunkAction<Action<boolean>, unknown> {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.APP__CHANGE_SHOW_REGIS_FORM_STATE,
      payload: show,
    });
  };
}
