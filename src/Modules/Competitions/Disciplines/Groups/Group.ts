import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import { competitionDisciplineGroups } from "@/Router/Routes"

import { getCompetitionDisciplineGroups } from "../Routes"
import { Category } from "./Category"

export class Group extends Entity {
  public competition_id: number
  public discipline_id: number
  public discipline_short: string
  public discipline_title: string
  public short: string
  public title: string
  public order: number

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
      groups: getCompetitionDisciplineGroups(cm, discipline),
    }
  }

  public updateProps(data: any) {
    this.categories = data.categories || []
    super.updateProps(data)

    this.competition_id = data.competition_id
    this.discipline_id = data.discipline_id
    this.discipline_short = data.discipline_short
    this.discipline_title = data.discipline_title
    this.short = data.short
    this.title = data.title
  }

  public setCategories(categories: Category[]) {
    this.categories = categories
  }

  public hasCategory(orderNr: number): boolean {
    return !!this.categories.filter(c => c.order === orderNr)
  }

  public getCategory(orderNr: number): string {
    const category = this.categories.filter(c => c.order === orderNr)[0]
    if (!category) return ""

    return category.title
  }
}
