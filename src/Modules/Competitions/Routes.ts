import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionAreas,
  competitionDetails,
  competitionDiscipline,
  competitionDisciplines,
  competitions,
  convertParams,
  createCompetition,
  manageCompetitions,
} from "@/Router/Routes"
import { Id, IRouteParams } from "@/types"

import areas from "./Areas/Routes"
import { details, root as detailsRoot } from "./Details/Routes"
import { disciplines, root as disciplinesRoot } from "./Disciplines/Routes"

/** Public routes */
const competitionsView = () =>
  import(/* webpackChunkName: "cm" */ "./Competitions.vue")

const competition = () =>
  import(/* webpackChunkName: "cm" */ "./Competition.vue")

/** Management routes */
const manageCms = () =>
  import(/* webpackChunkName: "cm" */ "./ManageCompetitions.vue")

export const root: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { auth: true, roles: [roles.SUPER_ADMIN] },
    path:
      "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
  {
    ...competitions,
    component: competitionsView,
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

export const getCompetitionDetails = (p: { cm: Id }) => {
  return {
    ...competitionDetails,
    params: convertParams(p),
  }
}

export const getDisciplines = (p: { cm: Id }) => {
  return {
    ...competitionDisciplines,
    params: convertParams(p),
  }
}

export const getAreas = (p: { cm: Id }) => {
  return {
    ...competitionAreas,
    params: convertParams(p),
  }
}

export const getDiscipline = (p: { cm: Id, discipline: Id }) => {
  return {
    ...competitionDiscipline,
    params: convertParams(p),
  }
}
