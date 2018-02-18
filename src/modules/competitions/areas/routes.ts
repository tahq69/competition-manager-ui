import { Location, Route, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionArea,
  competitionAreas,
  convertParams,
  createCompetitionArea,
  manageCompetitionArea,
} from "@/Router/Routes"
import { Id } from "@/types"

/** Public routes */
const areasView = () => import(/* webpackChunkName: "cm-areas" */ "./Areas.vue")
const areaView = () => import(/* webpackChunkName: "cm-areas" */ "./Area.vue")

/** Management routes */
const manageAreaView = () =>
  import(/* webpackChunkName: "cm-areas" */ "./ManageArea.vue")

export const areas: RouteConfig[] = [
  {
    ...competitionAreas,
    path: "areas",
    component: areasView,
    props: true,
  },
  {
    ...competitionArea,
    path: "areas/:area(\\d+)",
    component: areaView,
    props: true,
  },
  {
    ...createCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "areas/new",
    component: manageAreaView,
    props: true,
  },
  {
    ...manageCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "areas/:area(\\d+)/edit",
    component: manageAreaView,
    props: true,
  },
]

export const getAreas = (p: { cm: Id }) => {
  return {
    ...competitionAreas,
    params: convertParams(p),
  }
}
