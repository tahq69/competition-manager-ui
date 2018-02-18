import { Paging } from "crip-vue-bootstrap"

import { Pagination, Service } from "@/helpers"
import { Id } from "@/types"

import { Team } from "./team"
import { TeamMember } from "./team-member"

interface IFetchTeam {
  id: Id
}

interface IFetchTeams {
  paging: Paging<Team>
}

interface ISaveTeamMember {
  id?: Id
  name: string
  team_id: Id
  user_id?: Id
}

interface IFetchMember {
  id: Id
  team_id: Id
}

interface IFetchMembers {
  paging: Paging<TeamMember>
  team_id: Id
}

class TeamsService extends Service {
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
   * @returns {Promise<TeamMember>}
   */
  public async saveTeamMember(payload: ISaveTeamMember): Promise<TeamMember> {
    return await this.safeContext(async (http, api) => {
      const entity = new TeamMember(payload)
      return this.save(entity)
    })
  }

  public async fetchTeamMember(payload: IFetchMember) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("teams/{team}/members/{id}", {
        urlReplace: {
          id: payload.id.toString(),
          team: payload.team_id.toString(),
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

export default new TeamsService()
