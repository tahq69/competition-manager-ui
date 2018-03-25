import { Entity } from "@/helpers"
import { teamMembers, } from "@/router/routes"

export class ProfileTeam extends Entity {
  public name = ""
  public short = ""
  public logo = ""

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const team = this.id.toString()

    return {
      members: { ...teamMembers, params: { team }, },
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.name = data.name
    this.short = data.short
    this.logo = data.logo
  }
}
