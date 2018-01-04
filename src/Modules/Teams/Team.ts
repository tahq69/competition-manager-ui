import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import {
  createTeamMember,
  manageTeam,
  manageTeamMembers,
  teamDetails,
} from "@/Router/Routes"

export default class Team extends Entity {
  public logo: string
  public short: string
  public name: string

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {
      createMember: {
        ...(createTeamMember as Location),
        params: { team: this.id },
      },
      details: {
        ...(teamDetails as Location),
        params: { tab: "members", team: this.id },
      },
      edit: {
        ...(manageTeam as Location),
        params: { id: this.id },
      },
      manageMembers: {
        ...(manageTeamMembers as Location),
        params: { team: this.id },
      },
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.name = data.name
    this.short = data.short
    this.logo = data.logo
  }
}
