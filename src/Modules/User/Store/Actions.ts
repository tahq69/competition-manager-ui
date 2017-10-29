import http from "axios"
import { ActionContext, Store } from "vuex"

import { Api } from "@/Helpers/Api"
import { IState as RootState } from "@/Store/Contracts"

import {
  IEmailPasswordReset,
  IFetchProfile,
  IProfile,
  IRegister,
  IState,
} from "./Contracts"

type Action = ActionContext<IState, RootState>

export default {
  async register(action: Action, payload: IRegister): Promise<void> {
    const url = Api.url("users")
    try {
      await http.post(url, payload)
    } catch (error) {
      Api.handle(error)
    }
  },

  async fetchProfile(
    action: Action,
    payload: IFetchProfile,
  ): Promise<IProfile> {
    const url = Api.url(`users/${payload.userId}`)
    try {
      const { data } = await http.get(url)
      return data
    } catch (error) {
      Api.handle(error)
    }
  },

  async emailPasswordReset(action: Action, payload: IEmailPasswordReset) {
    const url = Api.url("password/email")
    try {
      await http.post(url, { email: payload.email })
    } catch (error) {
      Api.handle(error)
    }
  },
}
