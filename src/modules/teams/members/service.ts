import {
  url as createUrl,
  httpContext,
  Paginated,
  saveEntity
} from "@/helpers";

import {
  FetchTeamMemberPayload,
  FetchTeamMembersPayload,
  SaveTeamMemberPayload,
  FetchTeamMemberRolesPayload,
  SaveTeamMemberRolesPayload
} from "#/teams/members/typings";
import { TeamMember } from "#/teams/models/team-member";

export async function fetchTeamMember(payload: FetchTeamMemberPayload) {
  return await httpContext(async http => {
    const url = createUrl("teams/{team}/members/{id}", {
      urlReplace: {
        id: payload.id.toString(),
        team: payload.team_id.toString()
      }
    });

    const response = await http.get(url);
    return new TeamMember(response.data);
  });
}

export async function fetchTeamMembers(payload: FetchTeamMembersPayload) {
  return await httpContext(async http => {
    const url = createUrl("teams/{team}/members", {
      params: payload.paging.urlParams,
      urlReplace: { team: payload.team_id.toString() }
    });

    const response = await http.get(url);

    return new Paginated(response, r => new TeamMember(r));
  });
}

export async function saveTeamMember(payload: SaveTeamMemberPayload) {
  return await httpContext(async () => {
    const entity = new TeamMember(payload);
    return await saveEntity(entity, TeamMember);
  });
}

export async function fetchMemberRoles(payload: FetchTeamMemberRolesPayload) {
  return await httpContext(async http => {
    const url = createUrl("teams/{team}/members/{member}/roles", {
      urlReplace: payload
    });

    const response = await http.get(url);
    return response.data as string[];
  });
}

export async function saveMemberRoles(payload: SaveTeamMemberRolesPayload) {
  return await httpContext(async http => {
    const url = createUrl("teams/{team}/members/{member}/roles", {
      urlReplace: payload
    });

    await http.post(url, { roles: payload.roles });
  });
}
