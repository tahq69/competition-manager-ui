// tslint:disable:no-bitwise
export default class Utils {
  /**
   * Determines is the value undefined.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   * @memberof Utils
   */
  public static isUndefined(value: any): boolean {
    return typeof value === "undefined"
  }

  /**
   * Determines is the value defined.
   * Oposite of the 'isUndefined' method.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   * @memberof Utils
   */
  public static isDefined(value: any): boolean {
    return !Utils.isUndefined(value)
  }

  /**
   * Determines is the value of function type.
   *
   * @static
   * @param {*} func
   * @returns {boolean}
   * @memberof Utils
   */
  public static isFunction(func: any): boolean {
    const getType = {}
    return (
      Utils.isDefined(func) &&
      getType.toString.call(func) === "[object Function]"
    )
  }

  /**
   * Determines is the value empty.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   * @memberof Utils
   */
  public static isEmpty(value: any): boolean {
    return (
      Utils.isUndefined(value) ||
      value === "" ||
      value === null ||
      value !== value
    )
  }

  /**
   * Determines is the value not empty.
   * Opposite of the 'isEmpty' method.
   *
   * @static
   * @param {*} value
   * @returns {boolean}
   * @memberof Utils
   */
  public static hasValue(value: any): boolean {
    return !Utils.isEmpty(value)
  }

  public static hasProperty(object: any, ...properties: string[]): boolean {
    let target = object
    // tslint:disable-next-line:forin
    for (const arg in properties) {
      const prop = properties[arg]
      if (!object.hasOwnProperty(prop)) return false

      target = target[prop]
      if (Utils.isUndefined(target)) return false
    }

    return true
  }

  public static isInArray<T>(value: T, array: T[]): boolean {
    return !!~array.indexOf(value)
  }

  public static newGuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * Variable substitution on the string.
   *
   * @static
   * @param {string} template
   * @param {object} values
   * @returns
   * @memberof Utils
   */
  public static supplant(template: string, values: any) {
    return template.replace(/\{([^{}]*)\}/g, (a, b): string => {
      const r = values[b]
      const isStrOrNr = typeof r === "string" || typeof r === "number"

      return isStrOrNr ? r.toString() : a
    })
  }

  /**
   * Debounce method call.
   *
   * @static
   * @param {function} func      Method to be debounced
   * @param {number}   wait      Timeout to wait nex call
   * @param {boolean}  immediate Call method immediately
   * @returns {function}
   * @memberof Utils
   */
  public static debounce<T extends Function>(
    func: T,
    wait = 100,
    immediate = false,
  ): T {
    let timeout: number | null
    let args: IArguments | null
    let context: any
    let timestamp: number
    let result: number

    function later() {
      const last = Date.now() - timestamp

      if (last < wait && last >= 0) {
        timeout = window.setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          context = args = null
        }
      }
    }

    const debounced: any = function(this: any) {
      context = this
      args = arguments
      timestamp = Date.now()
      const callNow = immediate && !timeout
      if (!timeout) timeout = window.setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }

    return debounced
  }
}
