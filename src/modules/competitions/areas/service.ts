import { Service } from "@/helpers/service"
import { Id } from "@/types"

import { Area } from "./area"

interface IFetchAreas {
  competition_id: Id
}

interface IFetchArea extends IFetchAreas {
  id: Id
}

class AreaService extends Service {
  public async fetchAreas(payload: IFetchAreas): Promise<Area[]> {
    return await this.safeContext(async (http, api) => {
      const urlTpl = "competitions/{competition_id}/areas"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return data.reduce((acc: Area[], val: any) => {
        acc.push(new Area(val))
        return acc
      }, [])
    })
  }

  public async fetchArea(payload: IFetchArea): Promise<Area> {
    return await this.safeContext(async (http, api) => {
      const urlTpl = "competitions/{competition_id}/disciplines/{id}"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return new Area(data)
    })
  }
}

export default new AreaService()
