import http from "axios"
import { ActionContext, Store } from "vuex"

import { Api } from "@/Helpers/Api"
import Pagination from "@/Helpers/Pagination"
import { IState as RootState } from "@/Store/Contracts"

import Team from "../Team"
import TeamMember from "../TeamMember"
import {
  IFetchTeam,
  IFetchTeamMembers as IFetchMembers,
  IFetchTeams,
  IState,
} from "./Contracts"

type Teams = Pagination<Team>
type Members = Pagination<TeamMember>
type A = ActionContext<IState, RootState>

export default {
  async fetchTeam(action: A, payload: IFetchTeam): Promise<Team> {
    const url = Api.url("teams/{id}", {
      urlReplace: { id: payload.id.toString() },
    })

    try {
      const response = await http.get(url)
      return new Team(response.data)
    } catch (error) {
      Api.handle(error)
    }
  },

  /**
   * Fetch teams list from server api endpoint as pagination object.
   * @param {ActionContext<IState, RootState>} action
   * @param {IFetchTeams} payload
   */
  async fetchTeams(action: A, payload: IFetchTeams): Promise<Teams> {
    const url = Api.url("teams", { params: payload.paging.urlParams })

    try {
      const response = await http.get(url)
      const pagination = Pagination.create<Team>(response, r => new Team(r))
      return pagination
    } catch (error) {
      Api.handle(error)
    }
  },

  /**
   * Fetch team members list from server api endpoint as pagination object.
   * @param {ActionContext<IState, RootState>} action
   * @param {IFetchTeamMembers} payload
   */
  async fetchTeamMembers(action: A, payload: IFetchMembers): Promise<Members> {
    const url = Api.url("teams/{team}/members", {
      params: payload.paging.urlParams,
      urlReplace: { team: payload.teamId },
    })

    try {
      const response = await http.get(url)
      const pagination = Pagination.create<TeamMember>(
        response,
        r => new TeamMember(r),
      )
      return pagination
    } catch (error) {
      Api.handle(error)
    }
  },
}
