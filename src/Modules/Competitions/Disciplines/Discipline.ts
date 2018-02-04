import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"

import { getGroups } from "../Groups/Routes"
import { getCompetitionDetails, getDiscipline, getDisciplines } from "../Routes"
import { getManageDiscipline } from "./Routes"

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
    const cm = this.competition_id
    const discipline = this.id
    return {
      edit: getManageDiscipline({ cm, discipline }),
      show: getDiscipline({ cm, discipline }),
      groups: getGroups({ cm, discipline }),
      competition: getCompetitionDetails({ cm }),
      disciplines: getDisciplines({ cm }),
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
