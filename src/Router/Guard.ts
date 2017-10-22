import Vue from 'vue'
import Router, { Route, RawLocation } from 'vue-router'

import auth from '@/Helpers/Auth'
import { login, home } from './Routes'

export default function (router: Router) {
  router.beforeEach(navigationGuard)
}

type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void

async function navigationGuard(to: Route, from: Route, next: Next) {
  // Ignore all routes, where auth is not required
  if (!to.matched.some(r => r.meta.requiresAuth)) {
    return next()
  }

  // Check if user is logged in. If not, redirect to login page.
  if (auth.guest()) {
    return next({ ...login, query: { redirect: to.fullPath } })
  }

  // This route may require set of roles. If user has no access to route,
  // redirect him to home page with message code to display.
  const checkAll = to.matched.some(r => r.meta.requiresRoles)
  const checkAny = to.matched.some(r => r.meta.requiresAnyOfRoles)

  if (checkAll) {
    if (await auth.hasAllRoles(to.meta.requiresRoles)) return next()
    return next({ ...home, params: { message: 'permission_denied' } })
  }

  if (checkAny) {
    if (await auth.hasAnyRole(to.meta.requiresRoles)) return next()
    return next({ ...home, params: { message: 'permission_denied' } })
  }

  // No roles check required, simply user should be authorized to access next
  // route.
  return next()
}
