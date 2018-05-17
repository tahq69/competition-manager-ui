import { Validator } from "@/typings";

import { isInArray } from "./utils";

export * from "./utils";
export * from "./entity";
export * from "./pagination";
export * from "./local-storage";
export * from "./typings";
export * from "./events";

export function isInArrayValidator<T>(array: T[]): Validator<T> {
  return (value: T) => isInArray(value, array);
}
