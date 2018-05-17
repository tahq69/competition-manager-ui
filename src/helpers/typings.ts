import { AxiosStatic } from "axios";

import { IDictionary, Id } from "@/typings";

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

export interface IAudit {
  at?: string;
  by?: number;
  name?: string;
}

export interface ICreatedAudit extends IAudit {
  creator?: any;
}

export interface IModifiedAudit extends IAudit {
  modifier?: any;
}

export interface IEntity {
  id?: Id;
  created_at?: string;
  created_by?: number;
  created_by_name?: string;
  creator?: any;
  updated_at?: string;
  updated_by?: number;
  updated_by_name?: string;
  modifier?: any;
}