import { Location, RouteConfig } from "vue-router"

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

const routes: RouteConfig[] = [
  {
    ...competitionDisciplines,
    meta: { requiresAuth: true },
    path: "disciplines",
    component: disciplines,
  } as RouteConfig,
  {
    ...manageCompetitionDiscipline,
    meta: { requiresAuth: true },
    path: "disciplines/edit/:id(\\d+)",
    component: manageDiscipline,
  } as RouteConfig,
  {
    ...createCompetitionDiscipline,
    meta: { requiresAuth: true },
    path: "disciplines/new",
    component: manageDiscipline,
  } as RouteConfig,
  {
    ...competitionDiscipline,
    meta: { requiresAuth: true },
    path: "disciplines/:id(\\d+)",
    component: discipline,
  } as RouteConfig,
]

export default routes
