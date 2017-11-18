import http from "axios"
import { ActionContext, Store } from "vuex"

import User from "@/Components/Auth/User"

import { Api } from "@/Helpers/Api"
import {
  ICommonState as State,
  ISearchUser,
  IState as Root,
} from "@/Store/Contracts"

type A = ActionContext<State, Root>

export default {
  async searchUser(action: A, payload: ISearchUser): Promise<User[]> {
    const url = Api.url("users/search?term={name}&id={id}", {
      urlReplace: { id: (payload.id || 0).toString(), name: payload.name },
    })

    try {
      const response = await http.get(url)
      return response.data.data.map(data => new User(data))
    } catch (error) {
      Api.handle(error)
    }
  },
}
