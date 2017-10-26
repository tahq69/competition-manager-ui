import http from "axios"
import { ActionContext, Store } from "vuex"

import { Api } from "@/Helpers/Api"
import { IState as RootState } from "@/Store/Contracts"

import {
  IFetchAuthUser,
  ILogin,
  IState,
  IUpdateUserDetailsPayload,
} from "./Contracts"

type Action = ActionContext<IState, RootState>

export default {
  async fetchAuthUser({ commit, state }: Action, payload: IFetchAuthUser) {
    if (state.user.authenticated) return

    const url = Api.url("users/user")
    try {
      const { data } = await http.get(url)
      commit<IUpdateUserDetailsPayload>({
        type: "updateAuthUserDetails",
        email: data.email,
        id: data.id,
        name: data.name,
        roles: data.roles.map(role => ({ key: role.key })),
      })
    } catch (error) {
      Api.handle(error)
    }
  },

  async login({ commit, state }: Action, payload: ILogin) {
    if (state.user.authenticated) return

    const url = Api.url("oauth/token", { root: true })
    const { data } = await http.post(url, payload)
    return data
  },
}
