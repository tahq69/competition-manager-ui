import { Id } from "@/typings";
import { Entity } from "@/helpers/entity";

export enum AreaType {
  Arena = "ARENA",
  Cage = "CAGE",
  Ring = "RING",
  Tatami = "TATAMI"
}

export class Area extends Entity {
  public competition_id: Id = 0;
  public description: string = "";
  public nr: number = 0;
  public title: string = "";
  public type: AreaType = AreaType.Arena;

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
