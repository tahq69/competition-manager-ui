import Entity from "@/Components/Entity"
import { manageTeamMember } from "@/Router/Routes"

import Team from "./Team"

interface IUser {
  name: string
}

export default class TeamMember extends Entity {
  public user?: IUser
  public userId?: number
  public teamId?: number
  public team?: Team
  public name: string
  public membershipType: string

  constructor(data) {
    super(data)

    this.userId = data.user_id
    if (data.user) {
      this.user = { ...data.user }
    }

    this.teamId = data.team_id
    if (data.team) {
      this.team = new Team(data.team)
    }

    this.name = data.name
    this.membershipType = data.membership_type
  }

  public get user_id() {
    return this.userId
  }

  public get team_id() {
    return this.teamId
  }

  public get membership_type() {
    return this.membershipType
  }

  public get routes() {
    const edit = {
      ...manageTeamMember,
      params: { team: this.teamId, id: this.id },
    }

    return { edit }
  }
}
