import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionDiscipline,
  competitionDisciplines,
  createCompetitionDiscipline,
  manageCompetitionDiscipline,
} from "@/Router/Routes"

/** Public routes */
const disciplines = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./Disciplines.vue")

const discipline = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./Discipline.vue")

/** Management routes */
const manageDiscipline = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageDiscipline.vue")

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]
const routes: RouteConfig[] = [
  {
    ...competitionDisciplines,
    path: "disciplines",
    component: disciplines,
  } as RouteConfig,
  {
    ...manageCompetitionDiscipline,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "disciplines/:id(\\d+)/edit",
    component: manageDiscipline,
  } as RouteConfig,
  {
    ...createCompetitionDiscipline,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "disciplines/new",
    component: manageDiscipline,
  } as RouteConfig,
  {
    // TODO: this one should go to root view.
    ...competitionDiscipline,
    path: "disciplines/:id(\\d+)",
    component: discipline,
  } as RouteConfig,
]

export default routes
