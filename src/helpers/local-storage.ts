import { hasValue } from "./utils";

export class LocalStorage {
  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  public static has(key: string): boolean {
    const value = localStorage.getItem(key);
    return hasValue(value);
  }

  public static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
