import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  createCompetition,
  manageCompetitionAreas,
  manageCompetitionDetails,
  manageCompetitionManagers,
  manageCompetitions,
} from "@/Router/Routes"

import disciplines from "./Disciplines/Routes"

/** Public routes */
const competition = () =>
  import(/* webpackChunkName: "cm" */ "./Competition.vue")

/** Management routes */
const manageCms = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetitions.vue")

const manageCmAreas = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Areas.vue")

const manageCmDetails = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Details.vue")

const manageCmManagers = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Managers.vue")

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]

const routes: RouteConfig[] = [
  {
    ...(createCompetition as Location),
    component: competition,
    meta: { requiresAuth, requiresRoles: createRole },
    path: "/competitions/new",
  } as RouteConfig,
  {
    ...(manageCompetitions as Location),
    component: manageCms,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path:
      "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    component: competition,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "/competitions/:competition_id(\\d+)",
    children: [
      ...disciplines,
      {
        ...(manageCompetitionDetails as Location),
        meta: { requiresAuth },
        path: "edit/details",
        component: manageCmDetails,
      } as RouteConfig,
      {
        ...(manageCompetitionAreas as Location),
        meta: { requiresAuth },
        path: "edit/areas",
        component: manageCmAreas,
      } as RouteConfig,
      {
        ...(manageCompetitionManagers as Location),
        meta: { requiresAuth },
        path: "edit/managers",
        component: manageCmManagers,
      } as RouteConfig,
    ],
  } as RouteConfig,
]

export default routes
