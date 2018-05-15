import { DateTime } from "luxon";

import { Validator } from "@/typings";

import utils from "./utils";
export { Entity, IEntity } from "./entity";
export { Pagination } from "./pagination";

export const Utils = utils;

export function d(date: any): string {
  const result = DateTime.fromSQL(date).toISO();
  return result ? result : date;
}

export function isInArrayValidator<T>(array: T[]): Validator<T> {
  return (value: T) => Utils.isInArray(value, array);
}
