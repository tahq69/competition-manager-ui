import { Paging, Paginated } from "@/helpers/pagination";
import { saveEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";
import { Id } from "@/typings";

import { Team } from "./models/team";

interface IFetchTeam {
  id: Id;
}

interface IFetchTeams {
  paging: Paging;
  managed?: boolean;
}

interface ISaveTeam {
  id?: Id;
  name: string;
  short: string;
  logo: string;
}

class TeamsService {
  /**
   * Fetch single team instance from server api.
   * @param   {IFetchTeam} payload
   * @returns {Team}
   */
  public async fetchTeam(payload: IFetchTeam) {
    return await httpContext(async http => {
      const url = createUrl("teams/{id}", {
        urlReplace: { id: payload.id.toString() }
      });

      const response = await http.get(url);
      return new Team(response.data);
    });
  }

  /**
   * Fetch teams list from server api endpoint as pagination object.
   * @param   {IFetchTeams} payload
   * @returns {Promise<Pagination<Team>>}
   */
  public async fetchTeams(payload: IFetchTeams) {
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
   * Save team instance in server api.
   * @param   {ISaveTeam} payload Save record payload.
   * @returns {Promise<Team>} Saved record entity.
   */
  public async saveTeam(payload: ISaveTeam) {
    return await httpContext(async http => {
      const entity = new Team(payload);
      return await saveEntity(entity, Team);
    });
  }
}

export default new TeamsService();
