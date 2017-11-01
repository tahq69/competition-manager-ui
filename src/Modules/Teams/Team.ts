import Entity from "@/Components/Entity"
import {
  createTeamMember,
  editTeam,
  manageTeamMembers,
  teamDetails,
} from "@/Router/Routes"

export default class Team extends Entity {
  public logo: string
  public short: string
  public name: string

  constructor(data) {
    super(data)

    this.name = data.name
    this.short = data.short
    this.logo = data.logo
  }

  public get routes() {
    return {
      details: { ...teamDetails, params: { tab: "members", team: this.id } },
      edit: { ...editTeam, params: { id: this.id } },
      manageMembers: { ...manageTeamMembers, params: { team: this.id } },
      createMember: { ...createTeamMember, params: { team: this.id } },
    }
  }
}
