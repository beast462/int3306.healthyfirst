import { v4 } from 'uuid';

import { NotificationSeverity } from '@/view/common/types/Notification';

import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function notify(
  message: string,
  severity: NotificationSeverity = NotificationSeverity.INFO,
  details: string[] = [],
): AppThunkAction<Action<unknown>, void> {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.APP__NOTIFY,
      payload: {
        id: v4(),
        message,
        severity,
        details: typeof details === 'string' ? [details] : details,
      },
    });
}
