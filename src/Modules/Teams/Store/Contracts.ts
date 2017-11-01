import Paging from "@/Components/Grid/Paging"

import Team from "../Team"

export interface IState {
  teams: any[]
}

export interface IPayload {
  type: string
}

export interface IFetchTeams extends IPayload {
  type: "fetchTeams"
  paging: Paging<Team>
}
