import { AnyAction } from 'redux';
import { LSEntries } from '../../constants/LSEntries';

type AppState = {
  /* dark = 1 | light = 0 */
  viewMode: number;
};

function getDefaultViewMode(): number {
  const savedPref = localStorage.getItem(LSEntries.VIEW_MODE) ?? '0';
  let result: number;

  if (!['1', '0'].includes(savedPref)) result = 0;
  else result = -(-savedPref);

  localStorage.setItem(LSEntries.VIEW_MODE, result.toString());

  return result;
}

export const initialState: AppState = {
  viewMode: getDefaultViewMode(),
};

export function reduce(
  state: AppState = initialState,
  action: AnyAction,
): AppState {
  switch (action.type) {
    default:
      return state;
  }
}
