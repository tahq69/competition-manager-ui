import { Paginated, Paging } from "@/helpers";
import { saveEntity } from "@/helpers/service";
import { url as createUrl, httpContext } from "@/helpers/rest";
import { Id } from "@/typings";

import { Team } from "../models/team";
import { TeamMember } from "../models/team-member";

interface ISaveTeamMember {
  id?: Id;
  name: string;
  team_id: Id;
  user_id?: Id;
}

interface IFetchMember {
  id: Id;
  team_id: Id;
}

interface IFetchMembers {
  paging: Paging;
  team_id: Id;
}

class MembersService {
  /**
   * Save team member instance in server api.
   * @param   {ISaveTeamMember} payload
   * @returns {Promise<TeamMember>}
   */
  public async saveTeamMember(payload: ISaveTeamMember): Promise<TeamMember> {
    return await httpContext(async http => {
      const entity = new TeamMember(payload);
      return await saveEntity(entity, TeamMember);
    });
  }

  /**
   * Fetch team member instance from server api.
   * @param   {IFetchMember} payload
   * @returns {Promise<TeamMember>}
   */
  public async fetchTeamMember(payload: IFetchMember): Promise<TeamMember> {
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

  /**
   * Fetch team members list from server api endpoint as pagination object.
   * @param   {IFetchMembers} payload
   * @returns {Promise<Pagination<TeamMember>>}
   */
  public async fetchTeamMembers(payload: IFetchMembers) {
    return await httpContext(async http => {
      const url = createUrl("teams/{team}/members", {
        params: payload.paging.urlParams,
        urlReplace: { team: payload.team_id.toString() }
      });

      const response = await http.get(url);
      
      return new Paginated(response, r => new TeamMember(r));
    });
  }

  /**
   * Fetch team members roles list from server api endpoint.
   * @param   {{team: Id, member: Id}} payload
   * @returns {Promise<string[]>}
   */
  public async fetchRoles(payload: {
    team: Id;
    member: Id;
  }): Promise<string[]> {
    return await httpContext(async http => {
      const url = createUrl("teams/{team}/members/{member}/roles", {
        urlReplace: payload
      });

      const response = await http.get(url);
      return response.data;
    });
  }

  /**
   * Save team member roles in server api.
   * @param   {{team: Id, member: Id, roles: string[]}} payload
   * @returns {Promise<void>}
   */
  public async saveMemberRoles(payload: {
    team: Id;
    member: Id;
    roles: string[];
  }) {
    return await httpContext(async http => {
      const url = createUrl("teams/{team}/members/{member}/roles", {
        urlReplace: payload
      });

      await http.post(url, { roles: payload.roles });
    });
  }
}

export default new MembersService();
