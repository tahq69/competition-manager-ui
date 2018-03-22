import { Entity } from "@/helpers"

export class ProfileTeam extends Entity {
  public name = ""
  public short = ""
  public logo = ""

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.name = data.name
    this.short = data.short
    this.logo = data.logo
  }
}
