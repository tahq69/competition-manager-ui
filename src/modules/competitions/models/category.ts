import { Entity } from "@/helpers/entity";
import { Id } from "@/typings";

export enum DisplayType {
  Min = "MIN",
  Max = "MAX",
  Both = "BOTH"
}

export enum DimensionType {
  Weight = "WEIGHT",
  Age = "AGE"
}

export class Category extends Entity {
  public area_id: Id = 0;
  public category_group_id: Id = 0;
  public category_group_short: string = "";
  public category_group_title: string = "";
  public competition_id: Id = 0;
  public discipline_id: Id = 0;
  public discipline_short: string = "";
  public discipline_title: string = "";
  public display_type: DisplayType = DisplayType.Both;
  public max: number = 0;
  public min: number = 0;
  public order: number = 0;
  public short: string = "";
  public title: string = "";
  public type: DimensionType = DimensionType.Age;

  public createUrl =
    "competitions/{competition_id}/disciplines/{discipline_id}" +
    "/groups/{category_group_id}/categories";
  public updateUrl =
    "competitions/{competition_id}/disciplines/{discipline_id}" +
    "/groups/{category_group_id}/categories/{id}";

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    this.area_id = data.area_id;
    this.category_group_id = data.category_group_id;
    this.category_group_short = data.category_group_short;
    this.category_group_title = data.category_group_title;
    this.competition_id = data.competition_id;
    this.discipline_id = data.discipline_id;
    this.discipline_short = data.discipline_short;
    this.discipline_title = data.discipline_title;
    this.display_type = data.display_type;
    this.max = data.max;
    this.min = data.min;
    this.order = data.order;
    this.short = data.short;
    this.title = data.title;
    this.type = data.type;
  }
}
