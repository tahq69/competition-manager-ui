import http from 'axios'

import { Api } from './Api'

export interface User {
  roles: string[],
  name: string,
}

export default class AuthService {
  private user?: User

  public destroySession(): void {
    this.user = null
  }

  public async currentUser(): Promise<User> {
    if (this.user) return this.user

    const url = Api.url({ path: 'users/user' })
    try {
      const { data } = await http.get(url)
      this.user = data
      return this.user
    } catch (error) {
      Api.handle(error)
    }
  }

  public async login(credentials) {
    const url = Api.url({ path: 'oauth/token', root: true })
    let { data } = await http.post(url, credentials)
    return data
  }

  public addAuthorizationHeader(header): void {
    http.defaults.headers.common['Authorization'] = header
  }
}
