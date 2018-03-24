import { Location } from "vue-router"

import { UserBase } from "@/components/auth/models/user-base"
import { Entity } from "@/helpers/entity"
import { profile } from "@/router/routes"

export class User extends UserBase {
  constructor(data: any) {
    super(data)
    this.updateProps(data)
  }

  public get routes() {
    return {
      profile: { ...profile, params: { user: this.id } },
    }
  }

  public updateProps(data: any) {
    // this.name = data.name
  }
}
