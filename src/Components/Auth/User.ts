import Entity from "@/Components/Entity"
import { Location, profile } from "@/Router/Routes"

export default class User extends Entity {
  public name: string

  public key: string
  public text: string
  public value: { id: number; user_id: number; name: string }

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {
      profile: { ...(profile as Location), params: { id: this.id } },
    }
  }

  protected updateProps(data: any) {
    super.updateProps(data)

    this.name = data.name
    this.key = data.id.toString()
    this.text = data.name
    this.value = { id: 0, user_id: data.id, name: data.name }
  }
}
