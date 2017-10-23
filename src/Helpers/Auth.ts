import Vue from 'vue'
import http from 'axios'

import { i18n } from '@/Lang'
import LocalStorage from '@/Helpers/LocalStorage'
import Utils from '@/Helpers/Utils'
import ConfigAuth from '@/Config/Auth'
import AuthService from './AuthService'
import * as Roles from './Auth.Roles'

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
      this.addAuthHeaders()
      await this.service.currentUser()
    }
  }

  public logout() {
    this.service.destroySession()
    this.session.remove('access_token')
    this.session.remove('refresh_token')
    this.session.remove('access_keys')
  }

  public async login(username, password) {
    const request = {
      username,
      password,
    }

    // We merge grant type and client secret stored in configuration
    Object.assign(request, ConfigAuth.oauth)

    try {
      const response = await this.service.login(request)
      const data = response as TokenResponse
      this.storeSession(data)
      this.addAuthHeaders()

      const user = await this.service.currentUser()

      this.storeUserRoles(user.roles)

      return user
    } catch (error) {
      Vue.logger.error(error)
      throw i18n.t('auth.login.error')
    }
  }

  public guest() {
    this.addAuthHeaders()
    return !this.isAuthenticated()
  }

  public isAuthenticated() {
    this.addAuthHeaders()
    return this.session.has('access_token')
  }

  public async getUser() {
    if (this.session.has('access_token')) {
      this.addAuthHeaders()
      return await this.service.currentUser()
    }

    throw new Error('Unauthorized')
  }

  public hasRole(role: string): boolean {
    if (this.guest()) return false

    const check = (role) => !!~this.storedRoles().indexOf(role)

    // if user has an super_admin role, allow him to do anything
    if (check('SUPER_ADMIN')) return true

    return check(role)
  }

  public hasAnyRole(roles: string[]): boolean {
    if (this.guest()) return false

    for (const role in roles) {
      if (this.hasRole(role))
        return true
    }

    return false
  }

  public hasAllRoles(roles: string[]): boolean {
    if (this.guest()) return false

    for (const role in roles) {
      if (!this.hasRole(role))
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

  private storeUserRoles(roles: string[]): void {
    this.session.set('access_keys', roles.join(':::'))
  }

  private storedRoles(): string[] {
    if (!this.session.has('access_keys')) return []

    const roles = this.session.get('access_keys')
    return roles.split(':::')
  }
}

export const roles = Roles

export default new Auth()
