import { DialogContents } from '@/view/components/MasterDialog/DialogContents';
import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function openDialog(
  index: DialogContents,
): AppThunkAction<Action<DialogContents>, void> {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.APP__OPEN_DIALOG,
      payload: index,
    });
}
