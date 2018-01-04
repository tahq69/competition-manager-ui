import { Location, RouteConfig } from "vue-router"

import {
  competitionDiscipline, manageCompetitionDisciplines,
} from "@/Router/Routes"

const manageCmDisciplines = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageDisciplines.vue")

const routes: RouteConfig[] = [
  {
    ...(manageCompetitionDisciplines as Location),
    meta: { requiresAuth: true },
    path: "disciplines/manage",
    component: manageCmDisciplines,
  } as RouteConfig,
  {
    ...(competitionDiscipline as Location),
    meta: { requiresAuth: true },
    path: "disciplines/manage/:id(\\d+)",
    component: manageCmDisciplines,
  } as RouteConfig,
]

export default routes
