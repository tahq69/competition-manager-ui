import { Id } from "@/typings";
import { AreaType } from "@/modules/competitions/models/area";

export interface FetchAreasPayload {
  competition_id: Id;
}

export interface FetchAreaPayload {
  competition_id: Id;
  id: Id;
}

export interface SaveAreaPayload {
  competition_id: Id;
  description: string;
  id?: Id;
  nr: number;
  title: string;
  type: AreaType;
}
