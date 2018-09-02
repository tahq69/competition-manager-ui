import { Id } from "@/typings";
import { Entity, createEnumOptions } from "@/helpers";

export enum AreaType {
  Arena = "ARENA",
  Cage = "CAGE",
  Ring = "RING",
  Tatami = "TATAMI"
}

export const areaTypeOptions = createEnumOptions("AreaType", AreaType);

export class Area extends Entity {
  public competition_id: Id = 0;
  public description: string = "";
  public nr: number = 0;
  public title: string = "";
  public type: AreaType = AreaType.Arena;

  public createUrl: string = "competitions/{competition_id}/areas";
  public updateUrl: string = "competitions/{competition_id}/areas/{id}";

  constructor(data: any) {
    super(data);
    this.updateProps(data);
  }

  public updateProps(data: any) {
    this.competition_id = data.competition_id;
    this.description = data.description;
    this.nr = data.nr;
    this.title = data.title;
    this.type = data.type;
  }
}
