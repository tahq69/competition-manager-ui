import { Id } from "@/typings";
import { Paging } from "@/helpers";

export interface SaveTeamMemberPayload {
  id?: Id;
  name: string;
  team_id: Id;
  user_id?: Id;
}

export interface FetchTeamMemberPayload {
  id: Id;
  team_id: Id;
}

export interface FetchTeamMembersPayload {
  paging: Paging;
  team_id: Id;
}

export interface FetchTeamMemberRolesPayload {
  team: Id;
  member: Id;
}

export interface SaveTeamMemberRolesPayload {
  team: Id;
  member: Id;
  roles: string[];
}
