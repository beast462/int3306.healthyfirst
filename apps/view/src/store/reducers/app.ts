import { AnyAction } from 'redux';
import { breakpoints } from '../../constants/breakpoints';
import { LSEntries } from '../../constants/LSEntries';
import { ActionTypes } from '../ActionTypes';

type AppState = {
  /* dark = 1 | light = 0 */
  viewMode: number;
  showMenu: boolean;
  showRegisForm: boolean;
};

function getDefaultViewMode(): number {
  const savedPref = localStorage.getItem(LSEntries.VIEW_MODE) ?? '0';
  let result: number;

  if (!['1', '0'].includes(savedPref)) result = 0;
  else result = ~~savedPref;

  localStorage.setItem(LSEntries.VIEW_MODE, result.toString());

  return result;
}

export const initialState: AppState = {
  viewMode: getDefaultViewMode(),
  showMenu: window.innerWidth > breakpoints.values.md,
  showRegisForm: false,
};

export function reduce(
  state: AppState = initialState,
  action: AnyAction,
): AppState {
  switch (action.type) {
    case ActionTypes.APP__CHANGE_MENU_STATE:
      return { ...state, showMenu: action.payload };

    case ActionTypes.APP__CHANGE_SHOW_REGIS_FORM_STATE:
      return { ...state, showRegisForm: action.payload };

    default:
      return state;
  }
}
