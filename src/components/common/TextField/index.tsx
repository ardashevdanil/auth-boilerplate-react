import React from 'react'
import { FieldHookConfig, useField } from 'formik'
import { TextField as MuiTextField, TextFieldProps }  from '@material-ui/core'

export const TextField: React.FC<TextFieldProps & FieldHookConfig<string>> = (props) => {
  const [field, meta] = useField(props)

  return (
    <MuiTextField
      {...field}
      {...props}
      error={meta?.touched && !!meta?.error}
      helperText={meta?.touched && meta?.error ? meta?.error : ""}
    />
  )
}
