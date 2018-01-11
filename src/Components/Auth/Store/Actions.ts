import http from "axios"
import { ActionContext, Store } from "vuex"

import authService from "@/Components/Auth/Service"
import { Api } from "@/Helpers/Api"
import { IState as RootState } from "@/Store/types"

import { IFetchAuthUser, IState, IUpdateUserDetailsPayload } from "./Contracts"

type Action = ActionContext<IState, RootState>

export default {
  async fetchAuthUser({ commit, state }: Action, payload: IFetchAuthUser) {
    if (state.user.authenticated) return

    const user = await authService.fetchAuthenticatedUser()
    commit<IUpdateUserDetailsPayload>({
      type: "updateAuthUserDetails",
      email: user.email,
      id: parseInt(user.id.toString(), 10),
      name: user.name,
      roles: user.roles,
      team_roles: user.team_roles,
    })
  },
}
