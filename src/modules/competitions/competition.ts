import { Location } from "vue-router"

import { Entity } from "@/helpers/entity"
import { Id } from "@/types"

export class Competition extends Entity {
  public ambulance: string = ""
  public cooperation: string = ""
  public equipment: string = ""
  public invitation: string = ""
  public price: string = ""
  public prizes: string = ""
  public program: string = ""
  public rules: string = ""
  public subtitle: string = ""
  public team_id: Id = 0
  public title: string = ""

  public judge_id?: number
  public judge_name?: string
  public organization_date?: string
  public registration_till?: string

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.ambulance = data.ambulance
    this.cooperation = data.cooperation
    this.equipment = data.equipment
    this.invitation = data.invitation
    this.price = data.price
    this.prizes = data.prizes
    this.program = data.program
    this.rules = data.rules
    this.subtitle = data.subtitle
    this.team_id = data.team_id
    this.title = data.title

    this.judge_id = data.judge_id
    this.judge_name = data.judge_name
    this.organization_date = data.organization_date
    this.registration_till = data.registration_till

    // judge
  }
}
