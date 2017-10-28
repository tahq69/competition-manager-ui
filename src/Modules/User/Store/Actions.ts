import http from "axios"
import { ActionContext, Store } from "vuex"

import { Api } from "@/Helpers/Api"
import { IState as RootState } from "@/Store/Contracts"

import { IRegister, IState } from "./Contracts"

type Action = ActionContext<IState, RootState>

export default {
  async Register(action: Action, payload: IRegister): Promise<void> {
    const url = Api.url("users")
    try {
      await http.post(url, payload)
    } catch (error) {
      Api.handle(error)
    }
  },
}
