import { Id } from "@/typings";
import { Paging } from "@/helpers";

export interface FetchCompetitionPayload {
  id: Id;
}

export interface FetchCompetitionsPayload {
  owned?: boolean;
  paging: Paging;
}
