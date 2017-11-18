import { IState as AuthState } from "@/Components/Auth/Store/Contracts"
import { IState as TeamsState } from "@/Modules/Teams/Store/Contracts"

export interface IState {
  auth: AuthState
  teams: TeamsState
}

export interface ICommonState {}

export interface ISearchUser {
  type: "searchUser"
  id?: number
  name?: string
}
