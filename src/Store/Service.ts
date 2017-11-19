import http, { AxiosStatic as Axios } from "axios"

import User from "@/Components/Auth/User"
import { Api } from "@/Helpers/Api"

interface ISearchUser {
  id?: number
  name?: string
}

export default class Service {
  protected http: Axios
  protected api: typeof Api

  constructor() {
    this.api = Api
    this.http = http
  }

  public async searchUser(payload: ISearchUser) {
    return await this.safeContext(async (http1, api) => {
      const url = Api.url("users/search?term={name}&id={id}", {
        urlReplace: { id: (payload.id || 0).toString(), name: payload.name },
      })

      const response = await http1.get(url)
      const users = response.data.data.map(data => new User(data)) as User[]
      return users
    })
  }

  /**
   * Execute action in save context where default error handling is implemented.
   * @param {function} action
   */
  protected async safeContext<T>(action: (http: Axios, api: typeof Api) => T) {
    try {
      return action(this.http, this.api)
    } catch (error) {
      Api.handle(error)
    }
  }
}
