import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../ActionTypes';

export interface AccountData {
  id: number;
  username: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
}

export type DataState = AccountData[];
export const initialState: DataState = [];

export function reduce(
  state: DataState = initialState,
  action: AnyAction,
): DataState {
  switch (action.type) {
    case ActionTypes.ACCOUNT_DATA__SET_DATA:
      return action.payload;

    default:
      return state;
  }
}
