import { RouteConfig } from "vue-router"

import * as roles from "@/components/auth/roles"
import {
  competitionDiscipline,
  competitionDisciplineGroups,
  competitionDisciplines,
  convertParams,
  createCompetitionDiscipline,
  manageCompetitionDiscipline,
} from "@/router/routes"
import { Id } from "@/types"

import { groups } from "../groups/routes"

/** Public routes */
const disciplinesView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/CompetitionDisciplines.vue")

const disciplineView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/Discipline.vue")

const disciplineDetails = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/DisciplineDetails.vue")

/** Management routes */
const manageDiscipline = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/ManageDiscipline.vue")

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
    ...createCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "/competition/:cm(\\d+)/discipline/manage/new",
    props: true,
  },
  {
    ...manageCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "/competition/:cm(\\d+)/discipline/manage/:discipline(\\d+)",
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

export const getDiscipline = (p: { cm: Id; discipline: Id }) => {
  return {
    ...competitionDiscipline,
    params: convertParams(p),
  }
}

export const getManageDiscipline = (p: { cm: Id; discipline: Id }) => {
  return {
    ...manageCompetitionDiscipline,
    params: convertParams(p),
  }
}
