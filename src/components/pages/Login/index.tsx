/** @jsx jsx */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, FormikHelpers } from 'formik'
import { Link as RouterLink } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import {
  Avatar,
  Button,
  Link,
  Typography,
  Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { TextField } from 'components/common/TextField'
import { login } from 'ducks/modules/auth'
import { LoginFormValues, LoginFormErrors } from 'interfaces/auth'
import { RootState } from 'interfaces/store'
import { Routes } from 'constants/routes'
import { Theme } from 'utils/styled'

const containerStyles = css`
  && {
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
  }
`

const avatarStyles = (theme: Theme) => css`
  && {
    margin: 0 auto;
    background-color: ${theme.palette.secondary.main};
  }
`

const headingStyled = css`
  text-align: center;
`

const linkStyles = css`
  && {
    display: inline-block;
    margin-top: 16px;
  }
`

export const Login: React.FC = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.loading.auth?.login)
  const onSubmit = async (
    values: LoginFormValues,
    { setErrors }: FormikHelpers<LoginFormValues>,
  ): Promise<void> => {
    try {
      await dispatch(login(values))
    } catch (err) {
      const errors: LoginFormErrors = {
        password: 'Incorrect login or password',
      }

      setErrors(errors)
    }
  }

  const validate = (values: LoginFormValues): LoginFormErrors => {
    const errors: LoginFormErrors = {}

    if (!values.login) errors.login = 'Login is required'
    if (!values.password) errors.password = 'Password is required'
    if (values.password?.length < 8) errors.password = 'Password must be at least 8 characters'

    return errors;
  }

  const initialValues: LoginFormValues = {
    login: '',
    password: '',
  }

  return (
    <Container css={containerStyles} component='main' maxWidth='xs'>
      <div>
        <Avatar css={avatarStyles}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography css={headingStyled} component='h1' variant='h5'>
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
        >
          {() => (
            <Form>
              <TextField
                name='login'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Login*'
              />
              <TextField
                name='password'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Password*'
                type='password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                disabled={isLoading}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
        <Link
          css={linkStyles}
          to={Routes.register}
          variant='body2'
          component={RouterLink}
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </Container>
  )
}
