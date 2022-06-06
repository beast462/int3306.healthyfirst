import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { ActionTypes } from './ActionTypes';
import { reduce as appReduce, initialState as appIS } from './reducers/app';
import {
  reduce as locationManagerReduce,
  initialState as locationManagerIS,
} from './reducers/locationManager';

const store = configureStore({
  reducer: {
    app: appReduce,
    locationManager: locationManagerReduce,
  },
  preloadedState: {
    app: appIS,
    locationManager: locationManagerIS,
  },
  middleware(getDefaultMiddleware) {
    return [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      thunk,
    ];
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type GetState = () => ApplicationState;
export type Action<PayloadType> = {
  type: ActionTypes;
  payload: PayloadType;
};

export interface AppThunkAction<TAction, TResult = void> {
  (dispatch: (action: TAction) => void, getState: GetState):
    | TResult
    | PromiseLike<TResult>;
}

export default store;
