import Vue from "vue";
import { RawLocation } from "vue-router";

export * from "./lib/element-ui";

export interface IClasses extends IDictionary<boolean> {}
export type SortDirection = "ascending" | "descending";
export type Id = number | string;
export type Validator<T> = (value: T) => boolean;

export interface IDictionary<T> {
  [key: string]: T;
}

export interface IRouteParams extends IDictionary<Id> {}

export type Next<VM extends Vue = Vue> = (
  to?: RawLocation | false | ((vm: VM) => any) | void
) => void;

export interface PagingParams {
  direction?: SortDirection;
  pageSize?: string | number;
  page?: string | number;
  sort?: string;
}

export interface IPayload {
  type: string;
}
