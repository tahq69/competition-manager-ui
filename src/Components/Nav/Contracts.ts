import { Route } from "@/Router/Routes"

export interface INavOptions {
  route?: Route
  href?: string
  click?: () => void
  divider?: boolean
  text?: string
  isActive?: boolean
}
