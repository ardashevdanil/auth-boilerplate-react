export interface LoginFormValues {
  login: string,
  password: string,
}

export interface LoginFormErrors {
  login?: string,
  password?: string,
}

export interface RegisterFormValues extends LoginFormValues {
  confirmation: string,
}

export interface RegisterFormErrors {
  login?: string,
  password?: string,
  confirmation?: string,
}

export interface User {
  _id: string,
  login: string,
  name?: string,
}

export interface AuthState {
  profile?: User,
}
