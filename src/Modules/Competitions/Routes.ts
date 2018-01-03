import * as roles from "@/Components/Auth/Roles"
import {
  createCompetition,
  Location,
  manageCompetition,
  manageCompetitions,
  RouteConfig,
} from "@/Router/Routes"

const manageCm = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.vue")

const manageCms = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetitions.vue")

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]

const routes: RouteConfig[] = [
  {
    ...(createCompetition as Location),
    component: manageCm,
    meta: { requiresAuth, requiresRoles: createRole },
    path: "/competitions/new",
  } as RouteConfig,
  {
    ...(manageCompetitions as Location),
    component: manageCms,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "/competitions/manage/:page(\\d+)?/:sort?/:order?",
  } as RouteConfig,
  {
    ...(manageCompetition as Location),
    component: manageCm,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "/competitions/edit/:id(\\d+)",
  } as RouteConfig,
]

export default routes
