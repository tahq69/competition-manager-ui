import { AreaType } from "@/modules/competitions/models/area";

export class ManageArea {
  public description: string = "";
  public nr: number = 0;
  public title: string = "";
  public type: AreaType = AreaType.Arena;
}
