import { IState as AuthState } from "@/Components/Auth/Store/types"
import { IState as TeamsState } from "@/Modules/User/Store/types"

export interface IState {
  auth: AuthState
  teams: TeamsState
}

export interface ICommonState {
  test: null
}
