import Vue from "vue"
import Router, { Location, RawLocation, Route, RouteRecord } from "vue-router"

import { middleware as auth } from "@/Components/Auth"
import { Next } from "@/types"
import { home, login } from "./Routes"

export default function(router: Router) {
  router.beforeEach(navigationGuard)
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

async function navigationGuard(to: Route, from: Route, next: Next) {
  // Ignore all routes, where auth is not required
  if (!to.matched.some(r => r.meta.requiresAuth)) {
    return next()
  }

  // Check if user is logged in. If not, redirect to login page.
  if (!auth.isAuthenticated()) {
    return next({ ...login, query: { redirect: to.fullPath } })
  }

  // This route may require set of roles. If user has no access to route,
  // redirect him to home page with message code to display.
  const checkAll = to.matched.some(r => r.meta.requiresRoles)
  const checkAny = to.matched.some(r => r.meta.requiresAnyOfRoles)

  if (checkAll) {
    // Merge roles with all parent routes where all roles are required.
    const roles = searchAllRoles(to.matched, "requiresRoles")

    if (await auth.hasAllRoles(roles)) return next()
    return next({
      ...home,
      params: { message: "permission_denied" },
    })
  }

  if (checkAny) {
    // Merge roles with all parent routes.
    const roles = searchAllRoles(to.matched, "requiresAnyOfRoles")

    if (await auth.hasAnyRole(roles)) return next()
    return next({
      ...home,
      params: { message: "permission_denied" },
    })
  }

  // No roles check required, simply user should be authorized to access next
  // route.
  return next()
}
