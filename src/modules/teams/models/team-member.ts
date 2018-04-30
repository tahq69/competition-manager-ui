import http from "axios";
import { Location } from "vue-router";

import { Api } from "@/helpers/api";
import { Entity } from "@/helpers/entity";
import { Id } from "@/typings";

import { Team } from "./team";

interface IUser {
  name: string;
}

export class TeamMember extends Entity {
  public membership_type: string = "";
  public name: string = "";
  public team_id: Id = 0;
  public roles: string[] = [];
  public team?: Team;
  public user?: IUser;
  public user_id?: number;

  public createUrl = "teams/{team_id}/members";
  public updateUrl = "teams/{team_id}/members/{id}";

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  /**
   * Update current instance properties.
   * @param data
   */
  public updateProps(data: any) {
    this.user_id = data.user_id;
    if (data.user) {
      this.user = { ...data.user };
    }

    this.team_id = data.team_id;
    if (data.team) {
      this.team = new Team(data.team);
    }

    this.name = data.name;
    this.membership_type = data.membership_type;
  }
}
