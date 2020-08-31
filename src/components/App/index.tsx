import React, { useEffect } from 'react'
import axios from 'axios'
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'interfaces/store'
import { getProfile } from 'ducks/modules/auth'
import { Routes } from 'constants/routes'
import { ProtectedRoute } from 'components/common/ProtectedRoute'
import { UnauthorizedRoute } from 'components/common/UnauthorizedRoute'
import { Main } from 'components/pages/Main'
import { Login } from 'components/pages/Login'
import { Register } from 'components/pages/Register'
import { Preloader } from 'components/common/Preloader'

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')
  const isLoading = useSelector((state: RootState) => state.loading.auth?.getProfile)
  const isLoggedIn = useSelector((state: RootState) => state.auth?.profile?._id)

  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
      dispatch(getProfile())
    }
  }, [dispatch, jwt])

  if ((jwt && !isLoggedIn) || isLoading) return <Preloader />

  return (
    <Switch>
      <UnauthorizedRoute path={Routes.login} component={Login} />
      <UnauthorizedRoute path={Routes.register} component={Register} />
      <ProtectedRoute path={Routes.root} component={Main} />
    </Switch>
  )
}
