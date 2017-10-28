export interface IPayload {
  type: string
}

export interface IDictionary<T> {
  [key: number]: T
}

export interface IProfile {
  id: number
  name: string
  md5: string
}

export interface IState {
  profiles: IDictionary<IProfile>
}

/* MUTATIONS */

/* ACTIONS */

export interface IRegister extends IPayload {
  type: "register"
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface IFetchProfile extends IPayload {
  type: "fetchProfile"
  userId: number
}
