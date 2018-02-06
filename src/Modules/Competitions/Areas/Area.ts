import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import { Id } from "@/types"

export enum AreaType {
  Arena = "ARENA",
  Cage = "CAGE",
  Ring = "RING",
  Tatami = "TATAMI",
}

export class Area extends Entity {
  public competition_id: Id
  public description: string
  public nr: number
  public title: string
  public type: AreaType

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {}
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.competition_id = data.competition_id
    this.description = data.description
    this.nr = data.nr
    this.title = data.title
    this.type = data.type
  }
}
