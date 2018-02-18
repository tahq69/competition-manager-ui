import { Location } from "vue-router"

import { Entity } from "@/helpers/entity"
import { competitionDisciplineGroups } from "@/router/routes"
import { Id } from "@/types"

import { Category, DimensionType } from "./category"
import { getGroups } from "./routes"

export class Group extends Entity {
  public competition_id: Id
  public discipline_id: Id
  public discipline_short: string
  public discipline_title: string
  public max: number
  public min: number
  public order: number
  public rounds: number
  public short: string
  public time: number
  public title: string
  public type: DimensionType

  public categories: Category[]

  public createUrl = "competitions/{competition_id}/disciplines/{discipline_id}/groups"
  public updateUrl = "competitions/{competition_id}/disciplines/{discipline_id}/groups/{id}"

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const cm = this.competition_id
    const discipline = this.discipline_id

    return {
      groups: getGroups({ cm, discipline }),
    }
  }

  public get typeText() {
    if (this.type === DimensionType.Age) return "years"
    return "Kg"
  }

  public get timeText() {
    let s = this.time
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s
  }

  public get shortText() {
    return `${this.short} ${this.min}-${this.max} ${this.typeText} ${
      this.rounds
    } x ${this.timeText} min`
  }

  public get longText() {
    return `${this.title} from ${this.min} to ${this.max} ${this.typeText} ${
      this.rounds
    } rounds by ${this.timeText} minutes`
  }

  public updateProps(data: any) {
    this.categories = data.categories || []
    super.updateProps(data)

    this.competition_id = data.competition_id
    this.discipline_id = data.discipline_id
    this.discipline_short = data.discipline_short
    this.discipline_title = data.discipline_title
    this.max = data.max
    this.min = data.min
    this.order = data.order
    this.rounds = data.rounds
    this.short = data.short
    this.time = data.time
    this.title = data.title
    this.type = data.type
  }

  public setCategories(categories: Category[]) {
    this.categories = categories
  }
}