import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import {
  createCompetition,
  manageCompetition,
  manageCompetitions,
} from "@/Router/Routes"

export class Competition extends Entity {
  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {}
  }

  public updateProps(data: any) {
    super.updateProps(data)
  }
}
