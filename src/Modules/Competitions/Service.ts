import { Paging } from "crip-vue-bootstrap"

import { Pagination, Service } from "@/Helpers"
import { Competition } from "./Competition"

interface IFetchCompetitions {
  paging: Paging<Competition>
  owned?: boolean
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
}

export default new CompetitionService()
