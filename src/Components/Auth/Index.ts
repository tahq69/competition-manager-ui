import http from "axios"

import authService from "@/Components/Auth/Service"
import config from "@/Config"
import Storage from "@/Helpers/LocalStorage"
import { i18n } from "@/Lang"
import store from "@/Store"

import Middleware from "./Middleware"
import * as Roles from "./Roles"
import {
  IFetchAuthUser,
  ILogoutPayload,
  ITokenResponse,
} from "./Store/Contracts"

export const middleware = Middleware
export const roles = Roles

interface ICredentials {
  username: string
  password: string
}

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
    if (Storage.has("access_token")) {
      Auth.setAuthHeader()
      await store.dispatch<IFetchAuthUser>({ type: "fetchAuthUser" })

      return true
    }

    return false
  }

  public static async login(credentials: ICredentials) {
    if (await Auth.check()) return

    try {
      // Fetch secrets from server.
      const secrets = await authService.fetchLoginToken({
        client_id: config.auth_id,
        client_secret: config.auth_secret,
        grant_type: "password",
        scope: "*",
        password: credentials.password,
        username: credentials.username,
      })

      // Save secret in local storage to be able use them after browser page is
      // refreshed.
      Auth.storeSession(secrets)

      // Check will request server for user details and will update store data.
      await Auth.check()
    } catch (error) {
      throw i18n.t("user.login_error")
    }
  }

  public static async logout() {
    Auth.removeAuthHeader()
    Storage.remove("access_token")
    Storage.remove("refresh_token")
    await store.commit<ILogoutPayload>({ type: "logout" })
  }

  private static storeSession(secrets: ITokenResponse) {
    Storage.set("access_token", secrets.access_token)
    Storage.set("refresh_token", secrets.refresh_token)
    config.auth_token_type = secrets.token_type
  }

  private static getAuthHeader(): string | null {
    if (!Storage.has("access_token")) return null

    const accessToken = Storage.get("access_token")
    return `${config.auth_token_type} ${accessToken}`
  }

  private static setAuthHeader() {
    const header = Auth.getAuthHeader()
    http.defaults.headers.common["Authorization"] = header
  }

  private static removeAuthHeader() {
    http.defaults.headers.common["Authorization"] = undefined
  }
}
