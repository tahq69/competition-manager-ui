import { i18n } from "@/lang"
import utils from "./utils"

export { Api } from "./api"
export { Entity, IEntity } from "./entity"
export { Service } from "./service"
export { Pagination } from "./pagination"

export const Utils = utils

export function t(key: string): string {
  return i18n.t(key).toString()
}
