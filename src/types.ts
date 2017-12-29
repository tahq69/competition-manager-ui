export interface IDictionary<T> {
  [key: string]: T
}

export interface IClasses extends IDictionary<boolean> {}

export interface MemberBase {
  id: number
  user_id: number
  name: string
}
