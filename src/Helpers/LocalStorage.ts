import Utils from "./Utils"

export default class LocalStorage {
  public static remove(key: string): void {
    localStorage.removeItem(key)
  }

  public static has(key): boolean {
    const value = localStorage.getItem(key)
    return Utils.hasValue(value)
  }

  public static get(key): string | null {
    return localStorage.getItem(key)
  }

  public static set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
}
