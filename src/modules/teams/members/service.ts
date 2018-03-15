import { Paging } from "crip-vue-bootstrap"

import { Pagination, Service } from "@/helpers"
import { Id } from "@/types"

import { Team } from "../team"
import { TeamMember } from "../team-member"

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

class MembersService extends Service {
  /**
   * Save team member instance in server api.
   * @param   {ISaveTeamMember} payload
   * @returns {Promise<TeamMember>}
   */
  public async saveTeamMember(payload: ISaveTeamMember): Promise<TeamMember> {
    return await this.safeContext(async (http, api) => {
      const entity = new TeamMember(payload)
      return this.save(entity)
    })
  }

  /**
   * Fetch team member instance from server api.
   * @param   {IFetchMember} payload
   * @returns {Promise<TeamMember>}
   */
  public async fetchTeamMember(payload: IFetchMember): Promise<TeamMember> {
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
   * @param   {IFetchMembers} payload
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

export default new MembersService()
