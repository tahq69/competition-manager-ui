import Vue from 'vue'
import http from 'axios'

import { i18n } from '@/Lang'
import LocalStorage from '@/Helpers/LocalStorage'
import Utils from '@/Helpers/Utils'
import ConfigAuth from '@/Config/Auth'
import AuthService from './AuthService'

interface TokenResponse {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export class Auth {
  private service: AuthService
  private session: typeof LocalStorage

  public constructor() {
    this.session = LocalStorage
    this.service = new AuthService()
  }

  public async check(): Promise<void> {
    if (this.session.has('access_token')) {
      await this.service.currentUser()
    }
  }

  public logout() {
    this.service.destroySession()
    this.session.remove('access_token')
    this.session.remove('refresh_token')
  }

  public async login(username, password) {
    const request = {
      username,
      password,
    }

    // We merge grant type and client secret stored in configuration
    Object.assign(request, ConfigAuth.oauth)

    try {
      Vue.logger.info(request)
      const response = await this.service.login(request)
      const data = response.data as TokenResponse
      this.storeSession(data)
      this.addAuthHeaders()

      // TODO: Request for user roles

      return data
    } catch (error) {
      throw i18n.t('auth.login.error')
    }
  }

  public guest() {
    return !this.isAuthenticated()
  }

  public isAuthenticated() {
    return this.session.has('access_token')
  }

  public async getUser() {
    if (this.session.has('access_token')) {
      return await this.service.currentUser()
    }

    throw new Error('Unauthorized')
  }

  public async hasRole(role: string): Promise<boolean> {
    if (this.guest()) return false

    const user = await this.getUser()

    if (Utils.isEmpty(user)) return false

    const check = (role) => !!~user.roles.indexOf(role)

    // if user has an super_admin role, allow him to do anything
    if (check('SUPER_ADMIN')) return true

    return check(role)
  }

  public async hasAnyRole(roles: string[]): Promise<boolean> {
    if (this.guest()) return false

    for (const role in roles) {
      if (await this.hasRole(role))
        return true
    }

    return false
  }

  public async hasAllRoles(roles: string[]): Promise<boolean> {
    if (this.guest()) return false

    for (const role in roles) {
      if (!(await this.hasRole(role)))
        return false
    }

    return true
  }

  private getAuthHeader(): string | null {
    if (this.session.has('access_token')) {
      const access_token = this.session.get('access_token')
      return `${ConfigAuth.token_type} ${access_token}`
    }

    return null
  }

  private addAuthHeaders(): void {
    const header = this.getAuthHeader()
    this.service.addAuthorizationHeader(header)
  }

  private storeSession(data: TokenResponse): void {
    ConfigAuth.token_type = data.token_type
    this.session.set('access_token', data.access_token)
    this.session.set('refresh_token', data.refresh_token)
  }
}

export const roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',

  CREATE_POST: 'CREATE_POST',
  MANAGE_POSTS: 'MANAGE_POSTS',

  CREATE_TEAMS: 'CREATE_TEAMS',

  EDIT_COMPETITIONS: 'EDIT_COMPETITIONS',
  CREATE_COMPETITIONS: 'CREATE_COMPETITIONS',
}

export default new Auth()
