// tslint:disable:no-bitwise

import dateUtil from "element-ui/src/utils/date";

/**
 * Determines is the value undefined.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isUndefined(value: any): boolean {
  return typeof value === "undefined";
}

/**
 * Determines is the value defined.
 * Opposite of the 'isUndefined' method.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isDefined(value: any): boolean {
  return !isUndefined(value);
}

/**
 * Determines is the value of function type.
 *
 * @param {*} func
 * @returns {boolean}
 */
export function isFunction(func: any): boolean {
  const getType = {};
  return isDefined(func) && getType.toString.call(func) === "[object Function]";
}

/**
 * Determines is the value empty.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isEmpty(value: any): boolean {
  return (
    isUndefined(value) || value === "" || value === null || value !== value
  );
}

/**
 * Determines is the value not empty.
 * Opposite of the 'isEmpty' method.
 *
 * @param {*} value
 * @returns {boolean}
 */
export function hasValue(value: any): boolean {
  return !isEmpty(value);
}

export function hasProperty(object: any, ...properties: string[]): boolean {
  let target = object;
  // tslint:disable-next-line:forin
  for (const arg in properties) {
    const prop = properties[arg];
    if (!object.hasOwnProperty(prop)) return false;

    target = target[prop];
    if (isUndefined(target)) return false;
  }

  return true;
}

export function isInArray<T>(value: T, array: T[]): boolean {
  return !!~array.indexOf(value);
}

export function newGuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Variable substitution on the string.
 *
 * @param {string} template
 * @param {object} values
 * @returns {string}
 */
export function supplant(template: string, values: any) {
  return template.replace(
    /\{([^{}]*)\}/g,
    (a, b): string => {
      const r = values[b];
      const isStrOrNr = typeof r === "string" || typeof r === "number";

      return isStrOrNr ? r.toString() : a;
    }
  );
}

/**
 * Debounce method call.
 *
 * @param {function} func      Method to be debounced
 * @param {number}   wait      Timeout to wait nex call
 * @param {boolean}  immediate Call method immediately
 * @returns {function}
 */
export function debounce<T extends Function>(
  func: T,
  wait = 100,
  immediate = false
): T {
  let timeout: number | null;
  let args: IArguments | null;
  let context: any;
  let timestamp: number;
  let result: number;

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = window.setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  const debounced: any = function(this: any) {
    context = this;
    args = arguments;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = window.setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  return debounced;
}

export function toDate(date: any) {
  return isDate(date) ? new Date(date) : null;
}

export function isDate(date: any) {
  if (date === null || date === undefined) return false;
  if (isNaN(new Date(date).getTime())) return false;
  if (Array.isArray(date)) return false;
  return true;
}

export function formatDate(date: any, format: string) {
  date = toDate(date);
  if (!date) return "";
  return dateUtil.format(date, format);
}
