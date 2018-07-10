import { Validator } from "@/typings";

import { isInArray } from "@/helpers/utils";

export * from "@/helpers/utils";
export * from "@/helpers/entity";
export * from "@/helpers/pagination";
export * from "@/helpers/local-storage";
export * from "@/helpers/typings";
export * from "@/helpers/events";
export * from "@/helpers/rest";
export * from "@/helpers/service";

export function isInArrayValidator<T>(array: T[]): Validator<T> {
  return (value: T) => isInArray(value, array);
}
