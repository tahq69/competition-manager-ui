import { Route, RouteConfig } from "vue-router"

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

const routes: RouteConfig[] = [
  {
    ...competitionDisciplines,
    component: disciplines,
    path: "disciplines",
    props: true
  },
  {
    ...manageCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "disciplines/:discipline(\\d+)/edit",
    props: true
  },
  {
    ...createCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "disciplines/new",
    props: true
  },
  {
    // TODO: this one should go to root view.
    ...competitionDiscipline,
    component: discipline,
    path: "disciplines/:discipline(\\d+)",
    props: true,
  } as RouteConfig,
]

export default routes
