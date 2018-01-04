import Vue from "vue"
import { RawLocation } from "vue-router"

export interface IDictionary<T> {
  [key: string]: T
}

export interface IClasses extends IDictionary<boolean> {}

export type Next<VM extends Vue = Vue> = (
  to?: RawLocation | false | ((vm: VM) => any) | void,
) => void

export interface MemberBase {
  id: number
  user_id: number
  name: string
}
