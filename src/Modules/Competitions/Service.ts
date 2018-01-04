import { Paging } from "crip-vue-bootstrap"

import { Pagination, Service } from "@/Helpers"
import { Competition } from "./Competition"

interface IFetchCompetitions {
  paging: Paging<Competition>
  owned?: boolean
}

interface IFetchCompetition {
  id: number | string
}

class CompetitionService extends Service {
  public async fetchCompetitions(payload: IFetchCompetitions) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("competitions", {
        params: { ...payload.paging.urlParams, owned: !!payload.owned },
      })

      const response = await http.get(url)
      const pagination = Pagination.create(response, r => new Competition(r))
      return pagination
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
}

export default new CompetitionService()
