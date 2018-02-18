import { User } from "@/components/auth/user"
import { Api, Service } from "@/helpers"
import { getters } from "@/store"

import { IFetchUser } from "./types"

class UserService extends Service {
  public async fetchUser(payload: IFetchUser): Promise<User> {
    return await this.safeContext(async (http, api) => {
      if (!payload.id) payload.id = getters.user.id
      const url = api.url("users/{id}", { urlReplace: payload })

      const response = await http.get(url)
      return new User(response.data)
    })
  }
}

export default new UserService()
