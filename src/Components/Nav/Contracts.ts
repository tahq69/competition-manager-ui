import { IRoute } from "@/Router/Routes"

export interface INavOptions {
  route?: IRoute
  href?: string
  click?: () => void
  divider?: boolean
  text?: string
  isActive?: boolean
}
