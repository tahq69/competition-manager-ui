import { Id } from "@/typings";
import { Paging } from "@/helpers";

export * from "#/teams/competitions/typings";
export * from "#/teams/members/typings";

export interface FetchTeamPayload {
  id: Id;
}

export interface FetchTeamsPayload {
  paging: Paging;
  managed?: boolean;
}

export interface SaveTeamPayload {
  id?: Id;
  name: string;
  short: string;
  logo: string;
}
