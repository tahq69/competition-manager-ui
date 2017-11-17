import Paging from "@/Components/Grid/Paging"

import Team from "../Team"
import TeamMember from "../TeamMember"

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

export interface IFetchTeamMembers extends IPayload {
  type: "fetchTeamMembers"
  teamId: string
  paging: Paging<TeamMember>
}
