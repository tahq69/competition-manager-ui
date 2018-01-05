import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import {
  competitionDisciplines,
  createCompetition,
  manageCompetitionAreas,
  manageCompetitionDetails,
  manageCompetitionManagers,
  manageCompetitions,
} from "@/Router/Routes"

export class Competition extends Entity {
  public title: string
  public subtitle: string
  public cooperation: string
  public invitation: string
  public program: string
  public rules: string
  public ambulance: string
  public prizes: string
  public equipment: string
  public price: string

  public organization_date?: string
  public registration_till?: string
  public judge_id?: number
  public judge_name?: string

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    return {
      disciplines: {
        ...(competitionDisciplines as Location),
        params: { competition_id: this.id },
      },
      editDetails: {
        ...(manageCompetitionDetails as Location),
        params: { competition_id: this.id },
      },
      editAreas: {
        ...(manageCompetitionAreas as Location),
        params: { competition_id: this.id },
      },
      editManagers: {
        ...(manageCompetitionManagers as Location),
        params: { competition_id: this.id },
      },
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.title = data.title
    this.subtitle = data.subtitle
    this.cooperation = data.cooperation
    this.invitation = data.invitation
    this.program = data.program
    this.rules = data.rules
    this.ambulance = data.ambulance
    this.prizes = data.prizes
    this.equipment = data.equipment
    this.price = data.price

    this.organization_date = data.organization_date
    this.registration_till = data.registration_till
    this.judge_id = data.judge_id
    this.judge_name = data.judge_name

    // judge
    // managers
  }
}
