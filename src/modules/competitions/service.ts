import { AxiosStatic } from "axios";

import { Paging, Paginated } from "@/helpers/pagination";
import { saveEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";
import { store } from "@/store";
import { Id } from "@/typings";

import { FetchCompetitionPayload } from "#/competitions/typings";
import { Competition } from "#/competitions/models/competition";

interface IFetchCompetitions {
  paging: Paging;
  owned?: boolean;
}

interface IFetchTeamCompetitions {
  paging: Paging;
  team_id: Id;
}

interface ISaveCompetition {
  title: string;
  subtitle: string;
  registration_till: string;
  organization_date: string;
  team_id: Id;
}

export async function fetchCompetition(payload: FetchCompetitionPayload) {
  return await httpContext(async http => {
    const url = createUrl("competitions/{id}", {
      urlReplace: payload
    });

    const { data } = await http.get(url);
    return new Competition(data);
  });
}

class CompetitionService {
  public async fetchCompetitions(payload: IFetchCompetitions) {
    return await httpContext(async http => {
      const url = createUrl("competitions", {
        params: {
          ...payload.paging.urlParams,
          owned: (payload.owned ? 1 : 0).toString()
        }
      });

      return await this.requestCompetitionsPaging(http, url);
    });
  }

  public async fetchTeamCompetitions(payload: IFetchTeamCompetitions) {
    return await httpContext(async http => {
      const url = createUrl("competitions", {
        params: {
          ...payload.paging.urlParams,
          team_id: payload.team_id.toString()
        }
      });

      return await this.requestCompetitionsPaging(http, url);
    });
  }

  public async saveCompetition(payload: ISaveCompetition) {
    return await httpContext(async http => {
      const entity = new Competition(payload);
      return await saveEntity(entity, Competition);
    });
  }

  private async requestCompetitionsPaging(http: AxiosStatic, url: string) {
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
  }
}

export default new CompetitionService();
