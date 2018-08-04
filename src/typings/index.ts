import Vue from "vue";
import { RawLocation } from "vue-router";

export * from "@/typings/lib/element-ui";
export * from "@/helpers/typings";

export type Id = number | string;
export type SortDirection = "ascending" | "descending";
export type Validator<T> = (value: T) => boolean;
export type IDictionary<T> = { [key: string]: T };
export type IRouteParams = IDictionary<Id>;

export type Next<VM extends Vue = Vue> = (
  to?: RawLocation | false | ((vm: VM) => any) | void
) => void;

export interface IPayload {
  type: string;
}
