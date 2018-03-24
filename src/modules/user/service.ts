import { Api, Service } from "@/helpers"
import { getters } from "@/store"

import { Profile } from "./models/profile"
import { IFetchUserProfile } from "./types"

class UserService extends Service {
  public async fetchUserProfile(payload: IFetchUserProfile): Promise<Profile> {
    return await this.safeContext(async (http, api) => {
      if (!payload.id) payload.id = getters.user.id
      const url = api.url("users/{id}", { urlReplace: payload })

      const response = await http.get(url)
      return new Profile(response.data)
    })
  }
}

export default new UserService()
