import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import { competitionDisciplineGroups } from "@/Router/Routes"

export class Group extends Entity {
  public competition_id: number
  public discipline_id: number
  public discipline_short: string
  public discipline_title: string
  public short: string
  public title: string

  public createUrl = "competitions/{competition_id}/disciplines/{discipline_id}/groups"
  public updateUrl = "competitions/{competition_id}/disciplines/{discipline_id}/groups/{id}"

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const cm = this.competition_id.toString()
    const discipline = this.discipline_id.toString()
    const group = this.id.toString()

    return {
      groups: {
        ...competitionDisciplineGroups,
        params: { cm, discipline },
      },
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.competition_id = data.competition_id
    this.discipline_id = data.discipline_id
    this.discipline_short = data.discipline_short
    this.discipline_title = data.discipline_title
    this.short = data.short
    this.title = data.title
  }
}
