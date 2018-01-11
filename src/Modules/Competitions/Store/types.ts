import { Id, IPayload } from "@/types"

export interface ICompetition {
  id: Id
  team_id: Id
}

export interface IState {
  competitions: ICompetition[]
}

/* MUTATIONS */

export interface IAddCompetitionPayload extends IPayload, ICompetition {
  type: "addCompetition"
}

/* ACTIONS */

export interface IFetchCompetition extends IPayload {
  type: "fetchCompetition"
  id: Id
}
