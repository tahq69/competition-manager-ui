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

  public get title() {
    // TODO: move to translations and supplant
    return `Go to a page ${this.nr}`
  }
}
