import { Location } from "vue-router"

import { Entity, IEntity } from "@/helpers/entity"
import {
  createTeamMember,
  manageTeam,
  manageTeamMembers,
  teamMembers,
} from "@/router/routes"

export interface ITeam extends IEntity {
  logo?: string
  short?: string
  name?: string
}

export class Team extends Entity {
  public logo: string
  public short: string
  public name: string

  public createUrl = "teams"
  public updateUrl = "teams/{id}"

  constructor(data: ITeam) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const team = this.id.toString()
    return {
      createMember: {
        ...createTeamMember,
        params: { team },
      },
      members: {
        ...teamMembers,
        params: { team },
      },
      edit: {
        ...manageTeam,
        params: { team },
      },
      manageMembers: {
        ...manageTeamMembers,
        params: { team },
      },
    }
  }

  public updateProps(data: ITeam) {
    super.updateProps(data)

    this.name = data.name || ""
    this.short = data.short || ""
    this.logo = data.logo || ""
  }
}
