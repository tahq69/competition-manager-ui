import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionDiscipline,
  competitionDisciplineGroups,
  competitionDisciplines,
  convertParams,
  createCompetitionDiscipline,
  manageCompetitionDiscipline,
} from "@/Router/Routes"
import { Id } from "@/types"

import { groups } from "../Groups/Routes"

/** Public routes */
const disciplinesView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./CompetitionDisciplines.vue")

const disciplineView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./Discipline.vue")

const disciplineDetails = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./DisciplineDetails.vue")

/** Management routes */
const manageDiscipline = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageDiscipline.vue")

export const disciplines = [
  {
    ...competitionDisciplines,
    component: disciplinesView,
    path: "disciplines",
    props: true,
  },
]

export const root: RouteConfig[] = [
  {
    ...manageCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "/competition/:cm(\\d+)/discipline/:discipline(\\d+)/edit",
    props: true,
  },
  {
    ...createCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "/competition/:cm(\\d+)/discipline/new",
    props: true,
  },
  {
    component: disciplineView,
    path: "/competition/:cm(\\d+)/discipline/:discipline(\\d+)",
    props: true,
    children: [
      {
        ...competitionDiscipline,
        component: disciplineDetails,
        path: "",
        props: true,
      },
      ...groups,
    ],
  },
]

export const getDisciplines = (p: { cm: Id }) => {
  return {
    ...competitionDisciplines,
    params: convertParams(p),
  }
}

export const getDiscipline = (p: { cm: Id, discipline: Id }) => {
  return {
    ...competitionDiscipline,
    params: convertParams(p),
  }
}

export const getManageDiscipline = (p: { cm: Id, discipline: Id }) => {
  return {
    ...manageCompetitionDiscipline,
    params: convertParams(p),
  }
}
