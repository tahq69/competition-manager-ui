import http, { AxiosStatic as Axios } from "axios"
import Vue from "vue"

import { User } from "@/Components/Auth/User"
import { Api } from "@/Helpers/Api"
import { Entity } from "@/Helpers/Entity"

export type ContextAction<T> = (http: Axios, api: typeof Api) => T

export interface ISearchUser {
  id?: number
  name?: string
}

export class Service {
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
      const users = response.data.data.map(
        (data: any) => new User(data),
      ) as User[]
      return users
    })
  }

  protected async save<T extends Entity>(entity: T): Promise<T> {
    // If entity already exists, send patch request, otherwise - post.
    const type = entity.id > 0 ? "patch" : "post"
    const requestUrl = entity.id > 0 ? entity.updateUrl : entity.createUrl

    const url = Api.url(requestUrl, { urlReplace: entity })

    const { data } = await http[type](url, entity)
    entity.updateProps(data)

    return entity
  }

  protected async delete<T extends Entity>(entity: T): Promise<void> {
    const url = Api.url(entity.updateUrl, { urlReplace: entity })
    const { data } = await http.delete(url)
    Vue.logger.log(`Deleted ${url} [${data}]`)
  }

  /**
   * Execute action in save context where default error handling is implemented.
   * @param {function} action
   */
  protected async safeContext<T>(
    action: ContextAction<Promise<T>>,
  ): Promise<T> {
    try {
      return await action(this.http, this.api)
    } catch (error) {
      throw Api.handle(error)
    }
  }
}
