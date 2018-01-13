import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitions as competitionsRoute,
  createCompetition,
  manageCompetitions,
} from "@/Router/Routes"

import areas from "./Areas/Routes"
import { details, root as detailsRoot } from "./Details/Routes"
import { disciplines, root as disciplinesRoot } from "./Disciplines/Routes"

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
  },
  {
    ...competitionsRoute,
    component: competitions,
    path: "/competitions/:page(\\d+)?",
  },
  {
    ...createCompetition,
    component: competition,
    meta: { auth: true, teamRoles: [roles.CREATE_COMPETITIONS] },
    path: "/competition/new/:team(\\d+)",
    props: true,
  },
  {
    component: competition,
    path: "/competition/:cm(\\d+)",
    props: true,
    children: [...details, ...disciplines, ...areas],
  },
  ...detailsRoot,
  ...disciplinesRoot,
]

export default routes
