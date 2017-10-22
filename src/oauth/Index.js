import http from 'axios'
import LocalStorage from '../config/LocalStorage'
import AuthService from './AuthService'
import ConfigAuth from '../config/auth'

export default class OAuth {
  storages: { LocalStorage: any; };
  constructor() {
    this.storages = { LocalStorage }
    this.Session = this.storages[ConfigAuth.default_storage]
  }

  logout() {
    AuthService.destroySession()
    this.Session.remove('access_token')
    this.Session.remove('refresh_token')
  }

  guest() {
    return this.Session.has('access_token') ? false : true
  }

  isAuthenticated() {
    return this.Session.has('access_token') ? true : false
  }

  login(username, password) {
    const data = {
      username,
      password,
    }

    // We merge grant type and client secret stored in configuration
    Object.assign(data, ConfigAuth.oauth)

    return new Promise((resolve, reject) => {
      AuthService.attemptLogin(data).then(response => {
        this.storeSession(response)
        this.addAuthHeaders()
        resolve(response)
      }).catch(error => {
        console.log("OAUTH Authentication error: ", error)
        reject(error)
      })
    })
  }

  getUser() {
    if (this.Session.has('access_token')) {
      return new Promise((resolve, reject) => {
        AuthService.currentUser().then(response => {
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    }

    return new Promise(resolve => resolve(null))
  }

  getAuthHeader() {
    if (this.Session.has('access_token')) {
      const access_token = this.Session.get('access_token')
      return `${ConfigAuth.oauth_type} ${access_token}`
    }

    return null
  }

  addAuthHeaders() {
    const header = this.getAuthHeader();
    AuthService.addAuthorizationHeader(header)
  }

  storeSession(data) {
    this.Session.set('access_token', data.access_token)
    this.Session.set('refresh_token', data.access_token)
  }
}
