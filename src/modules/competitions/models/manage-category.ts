import { Id } from "@/typings";
import { DisplayType } from "@/modules/competitions/models/category";

export class ManageCategory {
  public area_id: Id = 0;
  public display_type: DisplayType = DisplayType.Both;
  public max: number = 0;
  public min: number = 0;
  // public order: number = 0;
  public short: string = "";
  public title: string = "";
}
