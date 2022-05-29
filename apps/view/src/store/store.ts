import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { ActionTypes } from './ActionTypes';
import { reduce as appReduce, initialState as appIS } from './reducers/app';
import {
  reduce as accountsTableReduce,
  initialState as accountsTableIS,
} from './reducers/accountsTable';
import {
  reduce as accountsDataReduce,
  initialState as accountsDataIS,
} from './reducers/accountsData';

const store = configureStore({
  reducer: {
    app: appReduce,
    accountsTable: accountsTableReduce,
    accountsData: accountsDataReduce,
  },
  preloadedState: {
    app: appIS,
    accountsTable: accountsTableIS,
    accountsData: accountsDataIS,
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
