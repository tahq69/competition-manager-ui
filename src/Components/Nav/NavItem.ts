import { IRoute } from "@/Router/Routes"

import { INavOptions } from "./Contracts"

let key = 0

export default class NavItem {
  public key: number
  public isActive: boolean
  public divider: boolean
  public text: string

  public route?: IRoute
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
    this.key = ++key
    this.route = options.route
    this.href = options.href
    this.click = options.click
    this.divider = options.divider
    this.text = options.text
    this.isActive = options.isActive
  }
}
