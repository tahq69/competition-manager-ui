import http from "axios"
import { ActionContext, Store } from "vuex"

import { Api } from "@/helpers/api"
import { IState as RootState } from "@/store/types"

import {
  IEmailPasswordReset,
  IFetchProfile,
  IProfile,
  IState,
} from "./types"

type Action = ActionContext<IState, RootState>

export default {
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
      throw new Error("error handled")
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
