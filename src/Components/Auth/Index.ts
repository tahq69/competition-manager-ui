import http from 'axios'

import Storage from '@/Helpers/LocalStorage'
import ConfigAuth from '@/Config/Auth'
import store from '@/Store'
import { i18n } from '@/Lang'

import { TokenResponse, LogoutPayload, FetchAuthUser, Login } from './Store/Contracts'
import Middleware from './Middleware'
import * as Roles from './Roles'

export const middleware = Middleware
export const roles = Roles

export default class Auth {

  /**
   * Check user authentication toke. if it is presented and user is not loaded
   * from server, do it.
   * 
   * @static
   * @returns {Promise<void>} 
   * @memberof Auth
   */
  public static async check(): Promise<boolean> {
    if (Storage.has('access_token')) {
      Auth.setAuthHeader()
      await store.dispatch<FetchAuthUser>({ type: 'fetchAuthUser' })

      return true
    }

    return false
  }

  public static async login(credentials: { username: string, password: string }) {
    if (await Auth.check()) return

    const payload = {
      type: 'login',
      client_id: ConfigAuth.client_id,
      client_secret: ConfigAuth.client_secret,
      grant_type: 'password',
      scope: '*',
      username: credentials.username,
      password: credentials.password,
    } as Login

    try {
      console.log(5)
      // Fetch secrets from server.
      const secrets = await store.dispatch<Login>(payload)
      console.log(6)
      // Save secret in local storage to be able use them after browser page is
      // refreshed.
      Auth.storeSession(secrets)

      // Check will request server for user details and will update store data.
      await Auth.check()
    } catch (error) {
      throw i18n.t('auth.login.error')
    }
  }

  public static async logout() {
    Auth.removeAuthHeader()
    Storage.remove('access_token')
    Storage.remove('refresh_token')
    await store.commit<LogoutPayload>({ type: 'logout' })
  }

  private static storeSession(secrets: TokenResponse) {
    Storage.set('access_token', secrets.access_token)
    Storage.set('refresh_token', secrets.refresh_token)
    ConfigAuth.token_type = secrets.token_type
  }

  private static getAuthHeader(): string | null {
    if (!Storage.has('access_token')) return null;

    const access_token = Storage.get('access_token')
    return `${ConfigAuth.token_type} ${access_token}`
  }

  private static setAuthHeader() {
    const header = Auth.getAuthHeader()
    http.defaults.headers.common['Authorization'] = header
  }

  private static removeAuthHeader() {
    http.defaults.headers.common['Authorization'] = undefined
  }
}