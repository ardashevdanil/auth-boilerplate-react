import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from 'interfaces/store'
import { Routes } from 'constants/routes'

export const UnauthorizedRoute: React.FC<RouteProps> = (props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth?.profile?._id)

  if (!isLoggedIn) {
    return <Route {...props} />
  }

  return <Redirect to={Routes.root} />
}
