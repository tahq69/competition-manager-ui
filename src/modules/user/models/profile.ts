import { Entity } from "@/helpers"

import { ProfileTeam } from "./profile-team"

export class Profile extends Entity {
  public name = ""
  public md5 = ""
  public teams: ProfileTeam[] = []

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.name = data.name
    this.md5 = data.md5
    if (data.teams)
      this.teams = data.teams.map((t: any) => new ProfileTeam(t))
  }
}
