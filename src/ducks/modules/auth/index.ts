import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { AppThunk } from 'interfaces/store'
import {
  AuthState,
  User,
  LoginFormValues,
  RegisterFormValues,
} from 'interfaces/auth'

let initialState: AuthState = {}

// SLICE
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerRequest: (state, action: PayloadAction<RegisterFormValues>) => state,
    registerSuccess: (state, action: PayloadAction<undefined>) => state,
    registerFailure: (state, action: PayloadAction<string>) => state,

    loginRequest: (state, action: PayloadAction<LoginFormValues>) => state,
    loginSuccess: (state, action: PayloadAction<undefined>) => state,
    loginFailure: (state, action: PayloadAction<string>) => state,

    getProfileRequest: (state, action: PayloadAction<undefined>) => state,
    getProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profile = action.payload
    },
    getProfileFailure: (state, action: PayloadAction<string>) => state,

    logoutRequest: (state, action: PayloadAction<undefined>) => state,
    logoutSuccess: (state, action: PayloadAction<undefined>) => {
      delete state.profile
    },
    logoutFailure: (state, action: PayloadAction<string>) => state,
  },
})

// ACTIONS
export const {
  registerRequest,
  registerSuccess,
  registerFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = auth.actions

// REDUCER
export const authReducer = auth.reducer

// THUNKS
export const register = (
  values: RegisterFormValues,
): AppThunk => async (dispatch) => {
  try {
    dispatch(registerRequest(values))
    await axios.post('/auth/register', values)
    dispatch(registerSuccess())
  } catch (err) {
    dispatch(registerFailure(err.toString()))

    if (err.response?.status === 409) {
      throw err
    }
  }
}

export const getProfile = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProfileRequest())

    const res = await axios.get('/user')

    dispatch(getProfileSuccess(res.data))
  } catch (err) {
    console.log(err)
    dispatch(getProfileFailure(err.toString()))

    if (err.response?.status === 401) {
      dispatch(logout())
    }
  }
}

export const login = (
  values: LoginFormValues,
): AppThunk => async (dispatch) => {
  try {
    dispatch(loginRequest(values))
    
    const res = await axios.post('/auth', values)
    const { jwt } = res.data

    localStorage.setItem('jwt', jwt)
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
    dispatch(loginSuccess())
    dispatch(getProfile())
  } catch (err) {
    dispatch(loginFailure(err.toString()))

    if (err.response?.status === 401) {
      throw err
    }
  }
}

export const logout = (): AppThunk => async(dispatch) => {
  try {
    dispatch(logoutRequest())
    localStorage.clear()
    dispatch(logoutSuccess())
  } catch (err) {
    dispatch(logoutFailure(err.toString()))
  }
}
