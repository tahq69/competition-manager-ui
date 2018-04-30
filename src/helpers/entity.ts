import Vue from "vue";

import { Id } from "@/typings";

export interface IAudit {
  at?: Date;
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
  created_at?: Date;
  created_by?: number;
  created_by_name?: string;
  creator?: any;
  updated_at?: Date;
  updated_by?: number;
  updated_by_name?: string;
  modifier?: any;
}

const log = Vue.logger.group("entity", "debug");

export class Entity {
  public id: Id = 0;
  public created: ICreatedAudit = {};
  public updated: IModifiedAudit = {};

  public createUrl: string = "";
  public updateUrl: string = "";

  /**
   * Initialize entity base properties.
   * @param {IEntity} data
   */
  constructor(data: IEntity) {
    log({ entity: this, input: data });

    this.id = data.id || 0;

    this.created = {
      at: data.created_at,
      by: data.created_by,
      name: data.created_by_name,
      creator: data.creator
    };

    this.updated = {
      at: data.updated_at,
      by: data.updated_by,
      name: data.updated_by_name,
      modifier: data.modifier
    };
  }
}
