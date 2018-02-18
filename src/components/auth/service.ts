import { Service } from "@/helpers/service"

import { Id } from "@/types"

import { User } from "./user"

interface IUserRole {
  key: string
}

interface IAuthUser {
  id: Id
  email: string
  name: string
  roles: IUserRole[]
  team_roles: { [key: string]: IUserRole[] }
}

interface ILogin {
  username: string
  password: string
  client_id: number
  client_secret: string
  grant_type: "password"
  scope: "*"
}

interface IFetchUser {
  id: number | string
}

class UserService extends Service {
  public async fetchAuthenticatedUser(): Promise<IAuthUser> {
    return await this.safeContext(async (http, api) => {
      const url = api.url("users/user")
      const { data } = await http.get(url)

      return {
        email: data.email,
        id: data.id,
        name: data.name,
        roles: data.roles,
        team_roles: data.team_roles,
      }
    })
  }

  public async fetchLoginToken(payload: ILogin) {
    return await this.safeContext(async (http, api) => {
      const url = api.url("oauth/token", { root: true })
      const { data } = await http.post(url, payload)
      return data
    })
  }

  public async fetchUser(payload: IFetchUser): Promise<User> {
    return await this.safeContext(async (http, api) => {
      const url = api.url("users/user/{id}", { urlReplace: payload })
      const { data } = await http.get(url)
      return new User(data)
    })
  }
}

export default new UserService()
