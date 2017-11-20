import Entity from "@/Components/Entity"
import { profile } from "@/Router/Routes"

export default class User extends Entity {
  public name: string

  constructor(data) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {
      profile: { ...profile, params: { id: this.id } },
    }
  }

  protected updateProps(data) {
    super.updateProps(data)

    this.name = data.name
  }
}
