import { ThunkAction } from 'redux-thunk'
import { Action, PayloadAction, AnyAction } from '@reduxjs/toolkit'

import { store } from 'ducks/store'
import { rootReducer } from 'ducks/rootReducer'

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export interface ActionMatcher {
  (action: AnyAction): action is PayloadAction,
}

export interface ActionMatcherGetter {
  (str: string): ActionMatcher,
}

export interface ActionHandler<T> {
  (state: T, action: PayloadAction<any>): void,
}

export interface ActionHandlerGetter<T, U = boolean> {
  (str: string, value: U): ActionHandler<T>
}
