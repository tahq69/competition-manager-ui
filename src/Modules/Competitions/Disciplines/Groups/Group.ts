import { Location } from "vue-router"

import { Entity } from "@/Helpers/Entity"
import { competitionDisciplineGroups } from "@/Router/Routes"
import { Id } from "@/types"

import { getCompetitionDisciplineGroups } from "../Routes"
import { Category } from "./Category"

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
  public type: string

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

  public hasCategory(orderNr: number): boolean {
    return !!this.categories.filter(c => c.order === orderNr)
  }

  public getCategory(orderNr: number): string {
    const category = this.categories.filter(c => c.order === orderNr)[0]
    if (!category) return ""

    return category.title
  }
}
