import { i18n } from "@/Lang"
import utils from "./Utils"

export { Api } from "./Api"
export { Entity } from "./Entity"
export { Service } from "./Service"
export { Pagination } from "./Pagination"

export const Utils = utils

export function t(key: string): string {
  return i18n.t(key).toString()
}
