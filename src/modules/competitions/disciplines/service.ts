import { Service } from "@/helpers/service"
import { Id } from "@/types"

import { Discipline } from "./discipline"

interface IFetchDisciplines {
  competition_id: Id
}

interface IFetchDiscipline {
  competition_id: Id
  id: Id
}

interface ISaveDiscipline {
  category_group_type: string
  category_type: string
  competition_id: Id
  description: string
  game_type: string
  id: Id
  short: string
  title: string
  type: string
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

  public async saveDiscipline(payload: ISaveDiscipline): Promise<Discipline> {
    return await this.safeContext(async (http, api) => {
      const entity = new Discipline(payload)
      return this.save(entity)
    })
  }
}

export default new DisciplineService()
