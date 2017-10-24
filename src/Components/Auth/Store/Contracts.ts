export interface TokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export interface Role {
  key: string
}

export interface User {
  authenticated: boolean
  name: string
  email: string
  id: number
}

export interface State {
  user: User
  roles: string[]
}

export interface Payload {
  type: string
}

/* MUTATIONS */

export interface LogoutPayload extends Payload {
  type: 'logout'
}

export interface UpdateUserDetailsPayload extends Payload {
  type: 'updateAuthUserDetails'
  name: string
  email: string
  id: number
  roles: Role[]
}

/* ACTIONS */

export interface FetchAuthUser extends Payload {
  type: 'fetchAuthUser'
}

export interface Login extends Payload {
  type: 'login'
  username: string
  password: string
  client_id: number
  client_secret: string
  grant_type: 'password'
  scope: '*'
}
