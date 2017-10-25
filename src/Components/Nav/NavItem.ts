import { Route } from "@/Router/Routes"

import { INavOptions } from "./Contracts"

export default class NavItem {
  public isActive: boolean
  public divider: boolean
  public text: string

  public route?: Route
  public href?: string
  public click?: () => void

  constructor(
    options: INavOptions = {
      text: "",
      divider: false,
      isActive: false,
      route: null,
      href: null,
      click: null,
    },
  ) {
    this.route = options.route
    this.href = options.href
    this.click = options.click
    this.divider = options.divider
    this.text = options.text
    this.isActive = options.isActive
  }
}
