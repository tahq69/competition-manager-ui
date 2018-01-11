import { IAddCompetitionPayload, IState } from "./types"

export default {
  addCompetition(state: IState, payload: IAddCompetitionPayload) {
    state.competitions.push({ id: payload.id, team_id: payload.team_id })
  },
}
