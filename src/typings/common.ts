export interface IDictionary<T> {
  [key: string]: T
}

export interface IClasses extends IDictionary<boolean> {}
