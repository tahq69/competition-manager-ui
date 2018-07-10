import {
  Paginated,
  httpContext,
  saveEntity,
  url as createUrl
} from "@/helpers";

import {
  FetchTeamPayload,
  FetchTeamsPayload,
  SaveTeamPayload
} from "#/teams/typings";
import { Team } from "#/teams/models/team";

/**
 * Fetch team details from server.
 * @param payload Query payload.
 */
export async function fetchTeam(payload: FetchTeamPayload) {
  return await httpContext(async http => {
    const url = createUrl("teams/{id}", {
      urlReplace: { id: payload.id.toString() }
    });

    const response = await http.get(url);
    return new Team(response.data);
  });
}

/**
 * Fetch paginated team list.
 * @param payload Query payload.
 */
export async function fetchTeams(payload: FetchTeamsPayload) {
  return await httpContext(async http => {
    const params = Object.assign({}, payload.paging.urlParams, {
      managed: payload.managed ? 1 : 0
    });

    const url = createUrl("teams", { params });
    const response = await http.get(url);

    return new Paginated(response, r => new Team(r));
  });
}

/**
 * Save team entity details.
 * @param payload Query payload.
 */
export async function saveTeam(payload: SaveTeamPayload) {
  return await httpContext(async () => {
    const entity = new Team(payload);
    return await saveEntity(entity, Team);
  });
}
