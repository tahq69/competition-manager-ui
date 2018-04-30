import { Entity } from "@/helpers";
import { teamMembers } from "@/router/routes";

export class ProfileTeam extends Entity {
  public name = "";
  public short = "";
  public logo = "";

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    this.name = data.name;
    this.short = data.short;
    this.logo = data.logo;
  }
}
