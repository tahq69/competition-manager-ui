import { httpContext, saveEntity } from "@/helpers";

import { SaveCompetitionPayload } from "#/teams/typings";
import { CompetitionCreate } from "#/teams/models/competition-create";

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
