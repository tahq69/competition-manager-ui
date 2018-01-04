import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  createCompetition,
  manageCompetition,
  manageCompetitionAreas,
  manageCompetitionDetails,
  manageCompetitionDisciplines,
  manageCompetitionManagers,
  manageCompetitions,
} from "@/Router/Routes"

const manageCms = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetitions.vue")

const manageCm = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.vue")

const manageCmAreas = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Areas.vue")

const manageCmDetails = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Details.vue")

const manageCmDisciplines = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Disciplines.vue")

const manageCmManagers = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetition.Managers.vue")

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
    path:
      "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    ...(manageCompetition as Location),
    component: manageCm,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "/competitions/edit/:id(\\d+)",
    children: [
      {
        ...(manageCompetitionDetails as Location),
        meta: { requiresAuth },
        path: "",
        component: manageCmDetails,
      } as RouteConfig,
      {
        ...(manageCompetitionAreas as Location),
        meta: { requiresAuth },
        path: "areas",
        component: manageCmAreas,
      } as RouteConfig,
      {
        ...(manageCompetitionDisciplines as Location),
        meta: { requiresAuth },
        path: "disciplines",
        component: manageCmDisciplines,
      } as RouteConfig,
      {
        ...(manageCompetitionManagers as Location),
        meta: { requiresAuth },
        path: "managers",
        component: manageCmManagers,
      } as RouteConfig,
    ],
  } as RouteConfig,
]

export default routes
