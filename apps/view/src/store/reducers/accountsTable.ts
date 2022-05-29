import { AnyAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../ActionTypes';

export type TableState = {
  rowsPerPage: number;
  page: number;
  itemsCount: number;
  order: 'asc' | 'desc';
  orderBy: string;
  // dialogContent: number;
  // confirmCallback: (confirmation: boolean) => void | Promise<void>;
};

export const inititalState: TableState = {
  rowsPerPage: 5,
  page: 0,
  itemsCount: 0,
  order: 'asc',
  orderBy: null,
  // dialogContent: 0,
  // confirmCallback: () => {
  //   return;
  // },
};

export function reduce(
  state: TableState = inititalState,
  action: AnyAction,
): TableState {
  switch (action.type) {
    case ActionTypes.ACCOUNT_TABLE__SET_ITEMS_COUNT:
      return { ...state, itemsCount: action.payload };

    case ActionTypes.ACCOUNT_TABLE__SET_PAGE:
      return { ...state, page: action.payload };

    case ActionTypes.ACCOUNT_TABLE__SET_RPP:
      return { ...state, rowsPerPage: action.payload };

    default:
      return state;
  }
}
