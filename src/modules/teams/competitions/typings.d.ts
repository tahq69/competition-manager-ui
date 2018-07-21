import { Id } from "@/typings";
import { Paging } from "@/helpers";

export interface SaveCompetitionPayload {
  title: string;
  subtitle: string;
  registration_till: string;
  organization_date: string;
  team_id: Id;
}

export interface FetchCompetitionsPayload {
  paging: Paging;
  team_id: Id;
}
