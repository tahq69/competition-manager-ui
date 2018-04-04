import { Paging } from "crip-vue-bootstrap";

import { Pagination, Service } from "@/helpers";
import { Id } from "@/types";

import { Team } from "./models/team";
import { TeamMember } from "./models/team-member";

interface IFetchTeam {
  id: Id;
}

interface IFetchTeams {
  paging: Paging<Team>;
  managed?: boolean;
}

interface ISaveTeam {
  id?: Id;
  name: string;
  short: string;
  logo: string;
}

class TeamsService extends Service {
  /**
   * Fetch single team instance from server api.
   * @param   {IFetchTeam} payload
   * @returns {Team}
   */
  public async fetchTeam(payload: IFetchTeam) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams/{id}", {
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
    return await this.safeContext(async (http, api) => {
      const params = Object.assign({}, payload.paging.urlParams, {
        managed: payload.managed ? 1 : 0
      });

      const url = api.url("teams", { params });

      const response = await http.get(url);
      const pagination = Pagination.create<Team>(response, r => new Team(r));
      return pagination;
    });
  }

  /**
   * Save team instance in server api.
   * @param   {ISaveTeam} payload Save record payload.
   * @returns {Promise<Team>} Saved record entity.
   */
  public async saveTeam(payload: ISaveTeam) {
    return await this.safeContext(async (http, api) => {
      const entity = new Team(payload);
      return this.save(entity);
    });
  }
}

export default new TeamsService();
