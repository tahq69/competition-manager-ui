import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import {
  competitionDetails,
  competitionDiscipline,
  competitionDisciplineGroups,
  competitionDisciplines,
  manageCompetitionDiscipline,
} from "@/Router/Routes"

export class Discipline extends Entity {
  public category_group_type: string
  public category_type: string
  public competition_id: number
  public description: string
  public game_type: string
  public short: string
  public title: string
  public type: string

  public createUrl = "competitions/{competition_id}/disciplines"
  public updateUrl = "competitions/{competition_id}/disciplines/{id}"

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const cm = this.competition_id.toString()
    const discipline = this.id.toString()
    return {
      edit: {
        ...manageCompetitionDiscipline,
        params: { cm, discipline },
      },
      show: {
        ...competitionDiscipline,
        params: { cm, discipline },
      },
      groups: {
        ...competitionDisciplineGroups,
        params: { cm, discipline },
      },
      competition: {
        ...competitionDetails,
        params: { cm },
      },
      disciplines: {
        ...competitionDisciplines,
        params: { cm },
      },
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.category_group_type = data.category_group_type
    this.category_type = data.category_type
    this.competition_id = data.competition_id
    this.description = data.description
    this.game_type = data.game_type
    this.short = data.short
    this.title = data.title
    this.type = data.type
  }
}
