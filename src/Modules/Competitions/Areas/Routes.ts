import { Location, Route, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionArea,
  competitionAreas,
  createCompetitionArea,
  manageCompetitionArea,
} from "@/Router/Routes"

/** Public routes */
const areas = () => import(/* webpackChunkName: "cm-areas" */ "./Areas.vue")
const area = () => import(/* webpackChunkName: "cm-areas" */ "./Area.vue")

/** Management routes */
const manageArea = () =>
  import(/* webpackChunkName: "cm-areas" */ "./ManageArea.vue")

const routes: RouteConfig[] = [
  {
    ...competitionAreas,
    path: "areas",
    component: areas,
    props: true,
  } as RouteConfig,
  {
    ...competitionArea,
    path: "areas/:area(\\d+)",
    component: area,
    props: true,
  } as RouteConfig,
  {
    ...createCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "areas/new",
    component: manageArea,
    props: true,
  } as RouteConfig,
  {
    ...manageCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "areas/:area(\\d+)/edit",
    component: manageArea,
    props: true,
  } as RouteConfig,
]

export default routes
