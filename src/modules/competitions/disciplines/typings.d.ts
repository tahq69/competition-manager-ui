import { Id } from "@/typings";

export interface FetchDisciplinesPayload {
  competition_id: Id;
}

export interface FetchDisciplinePayload {
  competition_id: Id;
  id: Id;
}
