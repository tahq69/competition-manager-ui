import store from "@/Store"
import * as roles from "./Roles"

export class Middleware {
  /**
   * Determines user authenticated sate.
   *
   * @returns {boolean}
   * @memberof Middleware
   */
  public isAuthenticated(): boolean {
    return store.state.auth.user.authenticated
  }

  /**
   * Determine has a auth user presented role.
   *
   * @param {string} role
   * @returns {boolean}
   * @memberof Middleware
   */
  public hasRole(role: string): boolean {
    if (!this.isAuthenticated()) return false

    // tslint:disable:no-shadowed-variable
    // tslint:disable-next-line:no-bitwise
    const check = (role: string) => !!~store.state.auth.roles.indexOf(role)

    // if user has an super_admin role, allow him to do anything
    if (check(roles.SUPER_ADMIN)) return true

    return check(role)
  }

  /**
   * Determine has a auth user any of role presented in list of roles.
   *
   * @param {string[]} roles
   * @returns {boolean}
   * @memberof Middleware
   */
  public hasAnyRole(roles: string[]): boolean {
    if (!this.isAuthenticated()) return false

    const hasAny = roles.find(role => this.hasRole(role))

    return !!hasAny
  }

  /**
   * Determine has a auth user all roles presented in list.
   *
   * @param {string[]} roles
   * @returns {boolean}
   * @memberof Middleware
   */
  public hasAllRoles(roles: string[]): boolean {
    if (!this.isAuthenticated()) return false

    const hasNoAny = roles.find(role => !this.hasRole(role))

    return !hasNoAny
  }
}

export default new Middleware()
