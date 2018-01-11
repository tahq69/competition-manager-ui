import http from "axios"
import { ActionContext, Store } from "vuex"

import cmService from "@/Modules/Competitions/Service"
import { IState as RootState } from "@/Store/types"

import { IAddCompetitionPayload, IFetchCompetition, IState } from "./types"

type Action = ActionContext<IState, RootState>

export default {
  async fetchCompetition(
    { commit, getters }: Action,
    payload: IFetchCompetition,
  ) {
    if (getters.getCmById(payload.id)) return getters.getCmById(payload.id)

    const cm = await cmService.fetchCompetition({ id: payload.id })
    const data = {
      id: cm.id,
      team_id: cm.team_id,
    }
    commit<IAddCompetitionPayload>({
      type: "addCompetition",
      ...data,
    })

    return data
  },
}
