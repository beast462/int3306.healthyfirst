import { AccountData } from './../../reducers/accountsData';
import { ActionTypes } from '../../ActionTypes';
import { Action, AppThunkAction } from '../../store';

export function getAccounts(
  creatorId: number,
): AppThunkAction<Action<AccountData[]>, unknown> {
  return async (dispatch) => {
    const {
      statusCode,
      payload: accounts,
      message,
      errorCode,
      error,
    } = await fetch(`/api/user/${creatorId}/creation`).then((res) =>
      res.json(),
    );

    if (statusCode === 200)
      return dispatch({
        type: ActionTypes.ACCOUNT_DATA__SET_DATA,
        payload: accounts,
      });

    console.error(`Error(${errorCode}) (${error}): ${message}`);
  };
}
