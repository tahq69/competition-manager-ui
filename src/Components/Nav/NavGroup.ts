import { Route } from "@/Router/Routes"

import { INavOptions } from "./Contracts"
import NavItem from "./NavItem"

export type NavItemType = NavGroup | NavItem

export default class NavGroup {
  public items: NavItemType[]
  public parent: { text: string }

  constructor(text: string, items: NavItemType[] = []) {
    this.parent = { text }
    this.items = items
  }

  public add(item: NavItemType) {
    this.items.push(item)
  }

  public create(options: INavOptions) {
    this.items.push(new NavItem(options))
  }
}
