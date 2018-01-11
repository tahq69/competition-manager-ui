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

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]

const routes: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  } as RouteConfig,
  {
    ...competitionsRoute,
    component: competitions,
    path: "/competitions/:page(\\d+)?",
  } as RouteConfig,
  {
    ...createCompetition,
    component: competition,
    meta: { requiresAuth, requiresRoles: createRole },
    path: "/competition/new",
  } as RouteConfig,
  {
    component: competition,
    path: "/competition/:competition_id(\\d+)",
    props: route => ({
      competitionId: parseInt(route.params.competition_id, 10),
    }),
    children: [
      ...areas,
      ...details,
      ...disciplines,
    ],
  } as RouteConfig,
]

export default routes
