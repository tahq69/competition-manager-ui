import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"

import { getCompetitionDisciplineGroups } from "../Routes"

export class Category extends Entity {
  public competition_id: number
  public area_id: number
  public discipline_id: number
  public discipline_short: string
  public discipline_title: string
  public category_group_id: number
  public category_group_short: string
  public category_group_title: string
  public short: string
  public title: string
  public order: number

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
      groups: getCompetitionDisciplineGroups(cm, discipline),
    }
  }

  public updateProps(data: any) {
    super.updateProps(data)

    this.competition_id = data.competition_id
    this.area_id = data.area_id
    this.discipline_id = data.discipline_id
    this.discipline_short = data.discipline_short
    this.discipline_title = data.discipline_title
    this.category_group_id = data.category_group_id
    this.category_group_short = data.category_group_short
    this.category_group_title = data.category_group_title
    this.short = data.short
    this.title = data.title
    this.order = data.order
  }
}
