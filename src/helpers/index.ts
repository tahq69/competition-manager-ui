import { Validator } from "@/typings";
import { t } from "@/lang";

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

export function createEnumOptions(name: string, enumRef: any) {
  return Object.keys(enumRef)
    .map(key => enumRef[key])
    .map(key => ({
      key: key.toString(),
      label: t(`enums.${name}_${key}`),
      value: key.toString()
    }));
}
