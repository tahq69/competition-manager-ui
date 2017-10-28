export interface IPayload {
  type: string
}

export interface IState {}

/* MUTATIONS */

/* ACTIONS */

export interface IRegister extends IPayload {
  type: "Register"
  name: string
  email: string
  password: string
  password_confirmation: string
}
