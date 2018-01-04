import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import { competitionDiscipline, manageCompetitionDiscipline } from "@/Router/Routes"

export class Discipline extends Entity {
  public competition_id: number
  public title: string
  public short: string
  public type: string
  public game_type: string
  public description: string

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {
      edit: {
        ...(manageCompetitionDiscipline as Location),
        params: { competition_id: this.competition_id, id: this.id },
      },
      show: {
        ...(competitionDiscipline as Location),
        params: { competition_id: this.competition_id, id: this.id },
      }
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.competition_id = data.competition_id
    this.title = data.title
    this.short = data.short
    this.type = data.type
    this.game_type = data.game_type
    this.description = data.description
  }
}
