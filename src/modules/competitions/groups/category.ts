import { Location } from "vue-router"

import { Entity } from "@/helpers/entity"
import { Id } from "@/types"

import { getGroups } from "../groups/routes"

export enum DisplayType {
  Min = "MIN",
  Max = "MAX",
  Both = "BOTH",
}

export enum DimensionType {
  Weight = "WEIGHT",
  Age = "AGE",
}

export class Category extends Entity {
  public area_id: Id
  public category_group_id: Id
  public category_group_short: string
  public category_group_title: string
  public competition_id: Id
  public discipline_id: Id
  public discipline_short: string
  public discipline_title: string
  public display_type: DisplayType
  public max: number
  public min: number
  public order: number
  public short: string
  public title: string
  public type: DimensionType

  public createUrl = "competitions/{competition_id}/disciplines/{discipline_id}" +
    "/groups/{category_group_id}/categories"
  public updateUrl = "competitions/{competition_id}/disciplines/{discipline_id}" +
    "/groups/{category_group_id}/categories/{id}"

  constructor(data: any) {
    super()
    this.updateProps(data)
  }

  public get routes() {
    const cm = this.competition_id
    const discipline = this.discipline_id
    const group = this.category_group_id

    return {
      groups: getGroups({ cm, discipline }),
    }
  }

  public get shortText() {
    const typeText = this.type === DimensionType.Age ? "y" : "Kg"
    switch (this.display_type) {
      case DisplayType.Min:
        return `${this.min}+ ${typeText}`

      case DisplayType.Max:
        return `-${this.max} ${typeText}`

      default:
        return `${this.min}-${this.max} ${typeText}`
    }
  }

  public get longText() {
    const typeText = this.type === DimensionType.Age ? "years" : "Kg"
    switch (this.display_type) {
      case DisplayType.Min:
        return `${this.min} and more ${typeText}`

      case DisplayType.Max:
        return `Till ${this.max} ${typeText}`

      default:
        return `From ${this.min} to ${this.max} ${typeText}`
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.area_id = data.area_id
    this.category_group_id = data.category_group_id
    this.category_group_short = data.category_group_short
    this.category_group_title = data.category_group_title
    this.competition_id = data.competition_id
    this.discipline_id = data.discipline_id
    this.discipline_short = data.discipline_short
    this.discipline_title = data.discipline_title
    this.display_type = data.display_type
    this.max = data.max
    this.min = data.min
    this.order = data.order
    this.short = data.short
    this.title = data.title
    this.type = data.type
  }
}
