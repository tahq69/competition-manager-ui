interface IErrors {
  [key: string]: string[]
}

export default class Form<T> {
  public unknownError: string = ""
  public errors: IErrors
  public data: T

  public constructor(initialData: T) {
    this.data = initialData
    this.errors = {}
  }

  public get hasErrors() {
    return Object.keys(this.errors).length > 0 || this.hasUnknownError
  }

  public get hasUnknownError() {
    return this.unknownError !== ""
  }

  public clearErrors() {
    this.unknownError = ""
    this.errors = {}
  }

  public addErrors(errors: IErrors | string) {
    if (typeof errors === "string") {
      this.unknownError = errors
      return
    }

    if (!errors) return

    for (const key in errors) {
      if (errors.hasOwnProperty(key) && typeof errors[key] === "string") {
        errors[key] = [errors[key].toString()]
      }
    }

    this.errors = errors
  }
}
