import { Api, Service } from "@/helpers"
import { getters } from "@/store"

import { Profile } from "./models/profile"
import { SignUp } from "./models/sign-up"
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

  public async register(payload: SignUp): Promise<void> {
    return await this.safeContext(async (http, api) => {
      const url = api.url("users")
      await http.post(url, payload)
    })
  }
}

export default new UserService()
