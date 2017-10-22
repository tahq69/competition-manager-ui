import http from 'axios'
import routes from '../api/Routes'

export default {
  user: null,

  destroySession() {
    this.user = null
  },

  async currentUser() {
    if (this.user) return this.user

    const user = await http.get(routes.CURRENT_USER_URL)
    this.user = user;
    return user
  },

  async attemptLogin(credentials) {
    let response = await http.post(routes.TOKEN_URL, credentials)
    return response.data
  },

  addAuthorizationHeader(header) {
    http.defaults.headers.common['Authorization'] = header
  },
}
