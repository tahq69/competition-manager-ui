import { Id } from "@/typings";

export interface FetchDisciplinesPayload {
  competition_id: Id;
}

export interface FetchDisciplinePayload {
  competition_id: Id;
  id: Id;
}

export interface SaveDisciplinePayload {
  category_group_type: string;
  category_type: string;
  competition_id: Id;
  description: string;
  game_type: string;
  id?: Id;
  short: string;
  title: string;
  type: string;
}
