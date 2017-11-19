import Paging from "@/Components/Grid/Paging"
import Pagination from "@/Helpers/Pagination"
import BaseService from "@/Store/Service"

import Team from "../Team"
import TeamMember from "../TeamMember"

interface IFetchTeam {
  id: number
}

interface IFetchTeams {
  paging: Paging<Team>
}

interface ISaveTeamMember {
  team_id: number
  name: string
  user_id?: number
  id?: number
}

interface IFetchMember {
  team_id: number
  id: number
}

interface IFetchMembers {
  team_id: number
  paging: Paging<TeamMember>
}

class Service extends BaseService {
  /**
   * Fetch single team instance from server api.
   * @param {IFetchTeam} payload
   * @returns {Team}
   */
  public async fetchTeam(payload: IFetchTeam) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams/{id}", {
        urlReplace: { id: payload.id.toString() },
      })

      const response = await http.get(url)
      return new Team(response.data)
    })
  }

  /**
   * Fetch teams list from server api endpoint as pagination object.
   * @param {IFetchTeams} payload
   * @returns {Promise<Pagination<Team>>}
   */
  public async fetchTeams(payload: IFetchTeams) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams", {
        params: payload.paging.urlParams,
      })

      const response = await http.get(url)
      const pagination = Pagination.create<Team>(response, r => new Team(r))
      return pagination
    })
  }

  /**
   * Save team member instance in server api.
   * @param {IFetchTeam} payload
   * @returns {TeamMember}
   */
  public async saveTeamMember(payload: ISaveTeamMember) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams/{team}/members", {
        urlReplace: { team: payload.team_id.toString() },
      })

      const response = await http.post(url, payload)
      return new TeamMember(response.data.data)
    })
  }

  public async fetchTeamMember(payload: IFetchMember) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams/{team}/members/{id}", {
        urlReplace: {
          team: payload.team_id.toString(),
          id: payload.id.toString(),
        },
      })

      const response = await http.get(url)
      return new TeamMember(response.data)
    })
  }

  /**
   * Fetch team members list from server api endpoint as pagination object.
   * @param {IFetchTeamMembers} payload
   * @returns {Promise<Pagination<TeamMember>>}
   */
  public async fetchTeamMembers(payload: IFetchMembers) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams/{team}/members", {
        params: payload.paging.urlParams,
        urlReplace: { team: payload.team_id.toString() },
      })

      const response = await http.get(url)
      const pagination = Pagination.create<TeamMember>(
        response,
        r => new TeamMember(r),
      )
      return pagination
    })
  }
}

export default new Service()
