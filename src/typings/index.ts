import Vue from "vue";
import { RawLocation } from "vue-router";

export interface IClasses extends IDictionary<boolean> {}
export type ElSortDirection = "ascending" | "descending";
export type SortDirection = "asc" | "desc";
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
  direction?: "asc" | "desc";
  perPage?: string | number;
  page?: string | number;
  sort?: string;
}

export interface IPayload {
  type: string;
}
