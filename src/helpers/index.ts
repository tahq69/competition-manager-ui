import { DateTime } from "luxon";

import { i18n } from "@/lang";
import utils from "./utils";
import Vue from "vue";

export { Api } from "./api";
export { Entity, IEntity } from "./entity";
export { Service } from "./service";
export { Pagination } from "./pagination";

export const Utils = utils;

export function t(key: string): string {
  return i18n.t(key).toString();
}

export function d(date: any): string {
  const result = DateTime.fromSQL(date).toISO();
  return result ? result : date;
}
