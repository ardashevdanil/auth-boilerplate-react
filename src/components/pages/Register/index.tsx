/** @jsx jsx */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, FormikHelpers } from 'formik'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { css, jsx } from '@emotion/core'
import {
  Avatar,
  Button,
  Link,
  Typography,
  Container,
} from '@material-ui/core'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import { TextField } from 'components/common/TextField'
import { register } from 'ducks/modules/auth'
import { RegisterFormValues, RegisterFormErrors } from 'interfaces/auth'
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

export const Register: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLoading = useSelector((state: RootState) => state.loading.auth?.register)
  const onSubmit = async (
    values: RegisterFormValues,
    { setErrors }: FormikHelpers<RegisterFormValues>,
  ): Promise<void> => {
    try {
      await dispatch(register(values))
      history.push(Routes.login)
    } catch (err) {
      const errors: RegisterFormErrors = {
        login: 'Login is already taken',
      }

      setErrors(errors)
    }
  }

  const validate = (values: RegisterFormValues): RegisterFormErrors => {
    const errors: RegisterFormErrors = {}

    if (!values.login) errors.login = 'Login is required'
    if (!values.password) errors.password = 'Password is required'
    if (!values.confirmation) errors.confirmation = 'Password is required'
    if (values.password?.length < 8) errors.password = 'Password must be at least 8 characters'
    if (values.confirmation?.length < 8)
      errors.confirmation = 'Password must be at least 8 characters'
    if (values.password !== values.confirmation)
      errors.confirmation = 'Password and cofirmation must match'

    return errors;
  }

  const initialValues: RegisterFormValues = {
    login: '',
    password: '',
    confirmation: '',
  }

  return (
    <Container css={containerStyles} component='main' maxWidth='xs'>
      <div>
        <Avatar css={avatarStyles}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography css={headingStyled} component='h1' variant='h5'>
          Sign up
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
              <TextField
                name='confirmation'
                variant='outlined'
                margin='normal'
                fullWidth
                label='Confirmation*'
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
          to={Routes.login}
          variant='body2'
          component={RouterLink}
        >
          Have an account? Sign In
        </Link>
      </div>
    </Container>
  )
}
