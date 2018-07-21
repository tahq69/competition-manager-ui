import { store } from "@/store";
import {
  url as createUrl,
  httpContext,
  saveEntity,
  Paginated
} from "@/helpers";

import { SaveCompetitionPayload } from "#/teams/typings";
import { CompetitionCreate } from "#/teams/models/competition-create";
import { Competition } from "#/competitions/models/competition";
import { FetchCompetitionsPayload } from "#/teams/competitions/typings";

/**
 * Save team competition entity details.
 * @param payload Query payload.
 */
export async function saveCompetition(payload: SaveCompetitionPayload) {
  return await httpContext(async () => {
    const entity = new CompetitionCreate(payload);
    return await saveEntity(entity, CompetitionCreate);
  });
}

export async function fetchTeamCompetitions(payload: FetchCompetitionsPayload) {
  return await httpContext(async http => {
    const team_id = payload.team_id.toString();
    const url = createUrl("competitions", {
      params: { ...payload.paging.urlParams, team_id }
    });

    const response = await http.get(url);

    return new Paginated(response, r => {
      const cm = new Competition(r);

      // Add competition to store for auth role validation on UI components.
      store.commit({
        type: "addCompetition",
        id: cm.id,
        team_id: cm.team_id
      });

      return cm;
    });
  });
}
