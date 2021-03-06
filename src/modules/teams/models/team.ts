import { Location } from "vue-router";

import { Entity, IEntity } from "@/helpers";

export interface ITeam extends IEntity {
  logo?: string;
  short?: string;
  name?: string;
}

export class Team extends Entity {
  public logo: string = "";
  public short: string = "";
  public name: string = "";

  public createUrl = "teams";
  public updateUrl = "teams/{id}";

  constructor(data: ITeam) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: ITeam) {
    this.name = data.name || "";
    this.short = data.short || "";
    this.logo = data.logo || "";
  }
}
