import { Location, Route, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionArea,
  competitionAreas,
  createCompetitionArea,
  manageCompetitionArea,
} from "@/Router/Routes"

const requiresAuth = { requiresAuth: true }

/** Public routes */
const areas = () => import(/* webpackChunkName: "cm-areas" */ "./Areas.vue")
const area = () => import(/* webpackChunkName: "cm-areas" */ "./Area.vue")

/** Management routes */
const manageArea = () =>
  import(/* webpackChunkName: "cm-areas" */ "./ManageArea.vue")

const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]
const convertCmId = (route: Route) => ({
  competitionId: parseInt(route.params.competition_id, 10),
})

const convertId = (route: Route) => ({
  ...convertCmId(route),
  id: parseInt(route.params.id, 10),
})

const routes: RouteConfig[] = [
  {
    ...competitionAreas,
    path: "areas",
    component: areas,
    props: convertCmId,
  } as RouteConfig,
  {
    ...competitionArea,
    path: "areas/:id(\\d+)",
    component: area,
    props: convertId,
  } as RouteConfig,
  {
    ...createCompetitionArea,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "areas/new",
    component: manageArea,
    props: convertCmId,
  } as RouteConfig,
  {
    ...manageCompetitionArea,
    meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
    path: "areas/:id(\\d+)/edit",
    component: manageArea,
    props: convertId,
  } as RouteConfig,
]

export default routes
