export default class Page {
  public static prev(current) {
    const nr = current > 1 ? current - 1 : 1
    return new Page("«", nr)
  }

  public static next(current, last) {
    const nr = current < last ? current + 1 : last
    return new Page("»", nr)
  }

  public nr: number
  public text: string

  public constructor(text = "", nr = 1) {
    this.text = text
    this.nr = nr
  }

  public isCurr(curr) {
    // tslint:disable-next-line:no-bitwise
    return (this.nr | 0) === (curr | 0)
  }

  public isDisabled(curr) {
    // tslint:disable-next-line:no-bitwise
    return this.isCurr(curr) && (this.text | 0) === 0
  }

  public isActive(curr) {
    return !this.isDisabled(curr) && this.isCurr(curr)
  }
}
