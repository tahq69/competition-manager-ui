import { Service } from "@/Helpers/Service"
import { Id } from "@/types"

import { Category } from "./Category"
import { Group } from "./Group"

interface IFetchGroups {
  competition_id: Id
  discipline_id: Id
}

interface IFetchCategories {
  competition_id: Id
  discipline_id: Id
  category_group_id: Id
}

interface IFetchGroup {
  competition_id: Id
  discipline_id: Id
  id: Id
}

interface ISaveGroup {
  id: Id
  competition_id: Id
  discipline_id: Id
  max: number
  min: number
  rounds: number
  short: string
  time: number
  title: string
  type: string
}

class GroupService extends Service {
  public async fetchGroups(payload: IFetchGroups): Promise<Group[]> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/groups"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return data.reduce((acc: Group[], val: any) => {
        acc.push(new Group(val))
        return acc
      }, [])
    })
  }

  public async fetchGroup(payload: IFetchGroup): Promise<Group> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}/groups/{id}"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return new Group(data)
    })
  }

  public async saveGroup(payload: ISaveGroup): Promise<Group> {
    return await this.safeContext(async (http, api) => {
      const entity = new Group(payload)
      return this.save(entity)
    })
  }

  public async fetchCategories(payload: IFetchCategories): Promise<Category[]> {
    return await this.safeContext(async (http, api) => {
      const urlTpl =
        "competitions/{competition_id}/disciplines/{discipline_id}" +
        "/groups/{category_group_id}/categories"
      const url = api.url(urlTpl, { urlReplace: payload })

      const { data } = await http.get(url)
      return data.reduce((acc: Category[], val: any) => {
        acc.push(new Category(val))
        return acc
      }, [])
    })
  }
}

export default new GroupService()
