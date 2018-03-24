import { Entity } from "@/helpers"

import { ProfileTeam } from "./profile-team"

export class Profile extends Entity {
  public md5: string = ""
  public name: string = ""
  public teams: ProfileTeam[] = []

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public updateProps(data: any) {
    this.md5 = data.md5
    this.name = data.name

    if (data.teams) {
      this.teams = data.teams.map((t: any) => {
        return new ProfileTeam(t)
      })
    }
  }
}
