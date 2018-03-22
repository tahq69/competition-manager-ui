import { Location } from "vue-router"

import { Entity } from "@/helpers/entity"
import { profile } from "@/router/routes"

export class User extends Entity {
  public name: string = ""

  public key: string = ""
  public text: string = ""
  public value: { id: number; user_id: number; name: string } = {} as any

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {
      profile: { ...profile, params: { id: this.id } },
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.name = data.name
    this.key = data.id.toString()
    this.text = data.name
    this.value = { id: 0, user_id: data.id, name: data.name }
  }
}
