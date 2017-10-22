import http from 'axios'

export interface User {
  roles: string[]
}

export default class AuthService {
  private user?: User

  public destroySession(): void {
    this.user = null
  }

  public async currentUser(): Promise<User> {
    if (this.user) return this.user

    const user = await http.get('/api/users/user')
    this.user = user.data;
    return this.user
  }

  public async login(credentials) {
    let response = await http.post('/oauth/token', credentials)
    return response.data
  }

  public addAuthorizationHeader(header): void {
    http.defaults.headers.common['Authorization'] = header
  }
}
