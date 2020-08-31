import { combineReducers } from '@reduxjs/toolkit'

import { authReducer } from 'ducks/modules/auth'
import { loadingReducer } from 'ducks/modules/loading'

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
})
