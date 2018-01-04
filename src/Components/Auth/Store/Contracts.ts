export interface ITokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export interface IRole {
  key: string
}

export interface IUser {
  authenticated: boolean
  name: string
  email: string
  id: number
}

export interface IState {
  user: IUser
  roles: string[]
}

export interface IPayload {
  type: string
}

/* MUTATIONS */

export interface ILogoutPayload extends IPayload {
  type: "logout"
}

export interface IUpdateUserDetailsPayload extends IPayload {
  type: "updateAuthUserDetails"
  name: string
  email: string
  id: number
  roles: IRole[]
}

/* ACTIONS */

export interface IFetchAuthUser extends IPayload {
  type: "fetchAuthUser"
}
