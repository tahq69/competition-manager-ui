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
    return typeof value === 'undefined'
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
      getType.toString.call(func) === '[object Function]'
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
    return Utils.isUndefined(value) ||
      value === '' ||
      value === null ||
      value !== value
  }

  /**
   * Determines is the value not empty.
   * Oposite of the 'isEmpty' method.
   * 
   * @static
   * @param {*} value 
   * @returns {boolean} 
   * @memberof Utils
   */
  public static hasValue(value: any): boolean {
    return !Utils.isEmpty(value)
  }

  public static hasProperty(object: object, ...properties: string[]): boolean {
    let target = object
    for (let arg in properties) {
      let prop = properties[arg]
      if (!object.hasOwnProperty(prop)) return false

      target = target[prop]
      if (Utils.isUndefined(target)) return false
    }

    return true
  }

  public static isInArray<T>(value: T, array: Array<T>): boolean {
    return !!~array.indexOf(value)
  }

  public static newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
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
  public static supplant(template: string, values: object) {
    return template.replace(/\{([^{}]*)\}/g, (a, b): string => {
      let r = values[b]
      let isStrOrNr = typeof r === 'string' || typeof r === 'number'

      return isStrOrNr ? r.toString() : a
    })
  }
}
