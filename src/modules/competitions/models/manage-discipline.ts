import { DimensionType } from "@/modules/competitions/models";

export class ManageDiscipline {
  public category_group_type: DimensionType = DimensionType.Age;
  public category_type: DimensionType = DimensionType.Weight;
  public competition_id: number | string = 0;
  public description: string = "";
  public game_type: string = "";
  public short: string = "";
  public title: string = "";
  public type: string = "";
}
