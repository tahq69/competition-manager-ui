import Paging from "@/Components/Grid/Paging"

import Team from "../Team"
import TeamMember from "../TeamMember"

export interface IState {
  teams: any[]
}

export interface IPayload {
  type: string
}

export interface IFetchTeam extends IPayload {
  type: "fetchTeam"
  id: number
}

export interface IFetchTeams extends IPayload {
  type: "fetchTeams"
  paging: Paging<Team>
}

export interface IFetchTeamMember extends IPayload {
  type: "fetchTeamMember"
  id: number
}

export interface IFetchTeamMembers extends IPayload {
  type: "fetchTeamMembers"
  teamId: string
  paging: Paging<TeamMember>
}

export interface ISaveTeamMember extends IPayload {
  type: "saveTeamMember"
  name: string
  user_id?: number
  id?: number
}
