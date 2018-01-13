import Vue from "vue"
import Router, { Location, RawLocation, Route, RouteRecord } from "vue-router"

import { middleware as auth } from "@/Components/Auth"
import { Next } from "@/types"
import { home, login } from "./Routes"

export default function(router: Router) {
  // Route may require user authorization.
  router.beforeEach(authGuard)

  // Route may require set of user roles. If user has no access to route,
  // redirect him to home page and show notice.
  router.beforeEach(requiredRolesGuard) // roles
  router.beforeEach(optionalRolesGuard) // anyRole

  // Route may require set of team roles validating url parameters.
  router.beforeEach(requiredTeamRolesGuard) // teamRoles
  router.beforeEach(optionalTeamRolesGuard) // anyTeamRole
}

function searchAllRoles(routes: RouteRecord[], metaKey: string) {
  return routes.reduce<string[]>((acc, route) => {
    if (!route.meta[metaKey]) return acc

    route.meta[metaKey].map((role: string) => {
      if (acc.indexOf(role) === -1) acc.push(role)
    })

    return acc
  }, [])
}

function authGuard(to: Route, from: Route, next: Next) {
  // Ignore all routes, where auth is not required
  if (!to.matched.some(r => r.meta.auth)) {
    return next()
  }

  // Check if user is logged in. If not, redirect to login page.
  if (!auth.isAuthenticated()) {
    return next({ ...login, query: { redirect: to.fullPath } })
  }

  next()
}

function requiredRolesGuard(to: Route, from: Route, next: Next) {
  if (to.matched.some(r => r.meta.roles)) {
    // Merge roles with all parent routes where all roles are required.
    const roles = searchAllRoles(to.matched, "roles")

    if (auth.hasAllRoles(roles)) return next()

    Vue.notice.error({
      title: "Permission denied",
      description: "User has no required roles",
    })

    return next(home)
  }

  next()
}

function optionalRolesGuard(to: Route, from: Route, next: Next) {
  if (to.matched.some(r => r.meta.anyRole)) {
    // Merge roles with all parent routes.
    const roles = searchAllRoles(to.matched, "anyRole")

    if (auth.hasAnyRole(roles)) return next()

    Vue.notice.error({
      title: "Permission denied",
      description: "User has no any of required roles",
    })
    return next(home)
  }

  next()
}

async function requiredTeamRolesGuard(to: Route, from: Route, next: Next) {
  if (to.matched.some(r => r.meta.teamRoles)) {
    // Merge roles with all parent routes.
    const roles = searchAllRoles(to.matched, "teamRoles")

    if (await auth.hasAnyTeamRole(to.params, roles)) return next()

    Vue.notice.error({
      title: "Permission denied",
      description: "User has no required team roles",
    })

    return next(home)
  }

  next()
}

async function optionalTeamRolesGuard(to: Route, from: Route, next: Next) {
  if (to.matched.some(r => r.meta.anyTeamRole)) {
    // Merge roles with all parent routes.
    const roles = searchAllRoles(to.matched, "anyTeamRole")

    if (await auth.hasAllTeamRoles(to.params, roles)) return next()

    Vue.notice.error({
      title: "Permission denied",
      description: "User has no any of required team roles",
    })

    return next(home)
  }

  next()
}
