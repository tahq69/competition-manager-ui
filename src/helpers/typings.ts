import { AxiosStatic } from "axios";

import { IDictionary } from "@/typings";

export type ContextAction<T> = (http: AxiosStatic) => T;

export interface IUrlParams {
  params?: IDictionary<string>;
  urlReplace?: object;
  root?: boolean;
}

export interface ISearchUser {
  id?: number;
  name?: string;
}
