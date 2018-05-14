import { Location } from "vue-router";

import { Entity } from "@/helpers/entity";
import { Id } from "@/typings";
import { d } from "@/helpers";

export class CompetitionCreate extends Entity {
  public subtitle: string = "";
  public team_id: Id = 0;
  public title: string = "";
  public organization_date: string = "";
  public registration_till: string = "";

  public judge_id?: number;
  public judge_name?: string;

  public createUrl = "competitions";

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    this.subtitle = data.subtitle;
    this.team_id = data.team_id;
    this.title = data.title;

    this.judge_id = data.judge_id;
    this.judge_name = data.judge_name;
    this.organization_date = d(data.organization_date);
    this.registration_till = d(data.registration_till);
  }
}
