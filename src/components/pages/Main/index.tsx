/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Container, Button } from '@material-ui/core'

import { RootState } from 'interfaces/store'
import { logout } from 'ducks/modules/auth'

const containerStyle = css`
  text-align: center;
`

export const Main: React.FC = () => {
  const dispatch = useDispatch()
  const login = useSelector((state: RootState) => state.auth.profile?.login)
  const onClick = (): void => {
    dispatch(logout())
  }

  return (
    <Container css={containerStyle} component='main' maxWidth='xs'>
      <Typography variant='h5'>
        Protected page.
        You can modify sourse code in
        <p>
          <Typography variant='overline'>
            /src/components/pages/Main/index.tsx
          </Typography>
        </p>
      </Typography>
      <Typography variant='h5'>
        Your login: {login}
      </Typography>
      <Button
        type='button'
        fullWidth
        variant='contained'
        color='primary'
        onClick={onClick}
      >
        Logout
      </Button>
    </Container>
  )
}
