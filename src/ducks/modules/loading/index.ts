import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import { LoadingState } from 'interfaces/loading'
import { ActionMatcherGetter, ActionHandlerGetter } from 'interfaces/store'

let initialState: LoadingState = {}

const getActionTypeMatcher: ActionMatcherGetter =
  (str) => (action): action is PayloadAction<any> => action.type.endsWith(str)

const getActionTypeHandler: ActionHandlerGetter<LoadingState> =
  (str, value) => (state, action): void => {
    _.set(state, action.type.replace(new RegExp(`${str}$`), '').split('/'), value)
  }

// SLICE
const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(
      getActionTypeMatcher('Request'),
      getActionTypeHandler('Request', true),
    )
    .addMatcher(
      getActionTypeMatcher('Success'),
      getActionTypeHandler('Success', false),
    )
    .addMatcher(
      getActionTypeMatcher('Failure'),
      getActionTypeHandler('Failure', false),
    )
})

// REDUCER
export const loadingReducer = loading.reducer
