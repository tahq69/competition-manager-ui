import Vue from "vue";

import { Id } from "@/typings";
import { ICreatedAudit, IModifiedAudit, IEntity } from "./typings";

const log = Vue.logger.group("entity", "debug");

export class Entity {
  public id: Id;
  public audit: { created: ICreatedAudit; updated: IModifiedAudit };

  public createUrl: string = "";
  public updateUrl: string = "";

  constructor(data: IEntity) {
    log({ entity: this, input: data });

    this.id = data.id || 0;

    this.audit = {
      created: {
        at: data.created_at,
        by: data.created_by,
        name: data.created_by_name,
        creator: data.creator
      },
      updated: {
        at: data.updated_at,
        by: data.updated_by,
        name: data.updated_by_name,
        modifier: data.modifier
      }
    };
  }
}
