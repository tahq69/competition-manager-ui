import { IState as AuthState } from "@/components/auth/store/types"
import { IState as TeamsState } from "@/modules/user/store/types"

export interface IState {
  auth: AuthState
  teams: TeamsState
}

export interface ICommonState {
  test: null
}
