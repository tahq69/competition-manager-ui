import { Service } from "@/Helpers/Service"

import { Discipline } from "./Discipline"

interface IFetchDisciplines {
  competition_id: string | number
}

interface IFetchDiscipline {
  competition_id: string | number
  id: string | number
}

class DisciplineService extends Service {
  public async fetchDisciplines(
    payload: IFetchDisciplines,
  ): Promise<Discipline[]> {
    return await this.safeContext(async (http, api) => {
      const urlTpl = "competitions/{competition_id}/disciplines"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return data.reduce((acc: Discipline[], val: any) => {
        acc.push(new Discipline(val))
        return acc
      }, [])
    })
  }

  public async fetchDiscipline(payload: IFetchDiscipline): Promise<Discipline> {
    return await this.safeContext(async (http, api) => {
      const urlTpl = "competitions/{competition_id}/disciplines/{id}"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return new Discipline(data)
    })
  }
}

export default new DisciplineService()
