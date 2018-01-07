import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitions as competitionsRoute,
  createCompetition,
  manageCompetitionAreas,
  manageCompetitionDetails,
  manageCompetitionManagers,
  manageCompetitions,
} from "@/Router/Routes"

import details from "./Details/Routes"
import disciplines from "./Disciplines/Routes"

/** Public routes */
const competitions = () =>
  import(/* webpackChunkName: "cm" */ "./Competitions.vue")

const competition = () =>
  import(/* webpackChunkName: "cm" */ "./Competition.vue")

/** Management routes */
const manageCms = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetitions.vue")

const manageCmAreas = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Areas.vue")

const manageCmManagers = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Managers.vue")

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]

const routes: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path:
      "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    ...competitionsRoute,
    component: competitions,
    path: "/competitions/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    ...createCompetition,
    component: competition,
    meta: { requiresAuth, requiresRoles: createRole },
    path: "/competition/new",
  } as RouteConfig,
  {
    component: competition,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "/competition/:competition_id(\\d+)",
    props: true,
    children: [
      ...details,
      ...disciplines,
      {
        ...manageCompetitionAreas,
        meta: { requiresAuth },
        path: "edit/areas",
        component: manageCmAreas,
      } as RouteConfig,
      {
        ...manageCompetitionManagers,
        meta: { requiresAuth },
        path: "edit/managers",
        component: manageCmManagers,
      } as RouteConfig,
    ],
  } as RouteConfig,
]

export default routes
