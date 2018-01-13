import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitions as competitionsRoute,
  createCompetition,
  manageCompetitions,
} from "@/Router/Routes"

import areas from "./Areas/Routes"
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

const routes: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { auth: true, roles: [roles.SUPER_ADMIN] },
    path:
      "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    ...competitionsRoute,
    component: competitions,
    path: "/competitions/:page(\\d+)?",
  } as RouteConfig,
  {
    ...createCompetition,
    component: competition,
    meta: { auth: true, teamRoles: [roles.CREATE_COMPETITIONS] },
    path: "/competition/new/:team(\\d+)",
    props: true,
  } as RouteConfig,
  {
    component: competition,
    path: "/competition/:cm(\\d+)",
    props: true,
    children: [...areas, ...details, ...disciplines],
  } as RouteConfig,
]

export default routes
