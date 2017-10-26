import { IRoute } from "@/Router/Routes"

import { INavOptions } from "./Contracts"
import NavItem from "./NavItem"

let key = 0

export type NavItemType = NavGroup | NavItem

export default class NavGroup {
  public key: number
  public items: NavItemType[]
  public parent: { text: string }

  constructor(text: string, items: NavItemType[] = []) {
    this.key = ++key
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
