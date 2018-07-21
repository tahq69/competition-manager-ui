import { AxiosStatic } from "axios";

import { store } from "@/store";
import { Id } from "@/typings";
import { Paging, Paginated } from "@/helpers/pagination";
import { url as createUrl, httpContext } from "@/helpers/rest";

import {
  FetchCompetitionPayload,
  FetchCompetitionsPayload
} from "#/competitions/typings";
import { Competition } from "#/competitions/models/competition";

export async function fetchCompetition(payload: FetchCompetitionPayload) {
  return await httpContext(async http => {
    const url = createUrl("competitions/{id}", {
      urlReplace: payload
    });

    const { data } = await http.get(url);
    return new Competition(data);
  });
}

export async function fetchCompetitions(payload: FetchCompetitionsPayload) {
  return await httpContext(async http => {
    const owned = (payload.owned ? 1 : 0).toString();
    const url = createUrl("competitions", {
      params: { ...payload.paging.urlParams, owned }
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
