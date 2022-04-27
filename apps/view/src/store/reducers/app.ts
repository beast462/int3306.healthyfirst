import { AnyAction } from 'redux';

type AppState = {
  token: string;
};

export const initialState: AppState = {
  token: '',
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
