import http from "axios"
import { ActionContext, Store } from "vuex"

import { Api } from "@/Helpers/Api"
import Pagination from "@/Helpers/Pagination"
import { IState as RootState } from "@/Store/Contracts"

import Team from "../Team"
import { IFetchTeams, IState } from "./Contracts"

type Action = ActionContext<IState, RootState>

export default {
  async fetchTeams(
    action: Action,
    payload: IFetchTeams,
  ): Promise<Pagination<Team>> {
    const url = Api.url("teams", { params: payload.paging.urlParams })
    try {
      const response = await http.get(url)
      const pagination = Pagination.create<Team>(response, r => new Team(r))
      return pagination
    } catch (error) {
      Api.handle(error)
    }
  },
}
