import Vue from "vue"
import { RawLocation } from "vue-router"

export interface IClasses extends IDictionary<boolean> {}
export type Id = number | string

export interface IDictionary<T> {
  [key: string]: T
}

export interface IRouteParams extends IDictionary<Id> {}

export type Next<VM extends Vue = Vue> = (
  to?: RawLocation | false | ((vm: VM) => any) | void,
) => void

export interface MemberBase {
  id: Id
  user_id: Id
  name: string
}

export interface IPayload {
  type: string
}
