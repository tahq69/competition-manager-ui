import http from "axios"

import Entity from "@/Components/Entity"
import { Api } from "@/Helpers/Api"
import { Location, manageTeamMember, manageTeamMembers } from "@/Router/Routes"

import Team from "./Team"

interface IUser {
  name: string
}

export default class TeamMember extends Entity {
  public user?: IUser
  public user_id?: number
  public team_id?: number
  public team?: Team
  public name: string
  public membership_type: string

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
  protected updateProps(data: any) {
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

  /**
   * Store current entity instance.
   * @returns {Promise<TeamMember>} Created instance.
   */
  protected async create(): Promise<this> {
    const url = Api.url("teams/{team_id}/members", { urlReplace: this })
    const { data } = await http.post(url, this)

    this.updateProps(data)

    return this
  }

  /**
   * Update current entity instance.
   * @returns {Promise<TeamMember>} Updated instance.
   */
  protected async update(): Promise<this> {
    const url = Api.url("teams/{team_id}/members/{id}", { urlReplace: this })
    const { data } = await http.patch(url, this)

    this.updateProps(data)
    return this
  }
}
