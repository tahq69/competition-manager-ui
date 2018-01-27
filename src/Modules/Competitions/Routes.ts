import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionAreas,
  competitionDetails,
  competitionDiscipline,
  competitionDisciplines,
  competitions,
  createCompetition,
  manageCompetitions,
} from "@/Router/Routes"
import { Id } from "@/types"

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

export const getCompetitionDetails = (cmId: Id) => {
  return {
    ...competitionDetails,
    params: { cm: cmId.toString() },
  }
}

export const getCompetitionDisciplines = (cmId: Id) => {
  return {
    ...competitionDisciplines,
    params: { cm: cmId.toString() },
  }
}

export const getCompetitionAreas = (cmId: Id) => {
  return {
    ...competitionAreas,
    params: { cm: cmId.toString() },
  }
}

export const getCompetitionDiscipline = (cmId: Id, disciplineId: Id) => {
  return {
    ...competitionDiscipline,
    params: { cm: cmId.toString(), discipline: disciplineId.toString() },
  }
}
