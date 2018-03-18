import { AxiosStatic } from "axios"
import { Paging } from "crip-vue-bootstrap"

import { Pagination, Service } from "@/helpers"
import { store } from "@/store"
import { Id } from "@/types"

import { Competition } from "./competition"

interface IFetchCompetitions { paging: Paging<Competition>; owned?: boolean }
interface IFetchTeamCompetitions { paging: Paging<Competition>; team_id: Id }
interface IFetchCompetition { id: Id }

class CompetitionService extends Service {
  public async fetchCompetitions(payload: IFetchCompetitions) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("competitions", {
        params: {
          ...payload.paging.urlParams,
          owned: (!!payload.owned).toString(),
        },
      })

      return await this.requestCompetitionsPaging(http, url)
    })
  }

  public async fetchTeamCompetitions(payload: IFetchTeamCompetitions) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("competitions", {
        params: {
          ...payload.paging.urlParams,
          team_id: payload.team_id.toString(),
        },
      })

      return await this.requestCompetitionsPaging(http, url)
    })
  }

  public async fetchCompetition(payload: IFetchCompetition) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("competitions/{id}", {
        urlReplace: payload,
      })

      const { data } = await http.get(url)
      return new Competition(data)
    })
  }

  private async requestCompetitionsPaging(http: AxiosStatic, url: string) {
    const response = await http.get(url)

    return Pagination.create(response, r => {
      const cm = new Competition(r)

      // Add competition to store for auth role validation on UI components.
      store.commit({
        type: "addCompetition",
        id: cm.id,
        team_id: cm.team_id,
      })

      return cm
    })
  }
}

export default new CompetitionService()
