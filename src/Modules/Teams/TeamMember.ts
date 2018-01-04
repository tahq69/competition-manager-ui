import http from "axios"

import { Api } from "@/Helpers/Api"
import { Entity } from "@/Helpers/Entity"
import { Location, manageTeamMember, manageTeamMembers } from "@/Router/Routes"

import Team from "./Team"

interface IUser {
  name: string
}

export default class TeamMember extends Entity {
  public membership_type: string
  public name: string
  public team?: Team
  public team_id?: number
  public user?: IUser
  public user_id?: number

  public createUrl = "teams/{team_id}/members"
  public updateUrl = "teams/{team_id}/members/{id}"

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const params = {
      id: this.id.toString(),
      team: this.team_id ? this.team_id.toString() : "",
    }

    return {
      edit: {
        ...(manageTeamMember as Location),
        params,
      },
      members: {
        ...(manageTeamMembers as Location),
        params: { team: this.team_id },
      },
    }
  }

  /**
   * Update current instance properties.
   * @param data
   */
  public updateProps(data: any) {
    super.updateProps(data)

    this.user_id = data.user_id
    if (data.user) {
      this.user = { ...data.user }
    }

    this.team_id = data.team_id
    if (data.team) {
      this.team = new Team(data.team)
    }

    this.name = data.name
    this.membership_type = data.membership_type
  }
}
