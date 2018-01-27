import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionDiscipline,
  competitionDisciplineGroups,
  competitionDisciplines,
  createCompetitionDiscipline,
  manageCompetitionDiscipline,
} from "@/Router/Routes"
import { Id } from "@/types"

import { groups } from "./Groups/Routes"

/** Public routes */
const disciplinesView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./CompetitionDisciplines.vue")

const discipline = () =>
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
    component: discipline,
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

export const getManageCompetitionDiscipline = (cmId: Id, disciplineId: Id) => {
  return {
    ...manageCompetitionDiscipline,
    params: { cm: cmId.toString(), discipline: disciplineId.toString() },
  }
}

export const getCompetitionDisciplineGroups = (cmId: Id, disciplineId: Id) => {
  return {
    ...competitionDisciplineGroups,
    params: { cm: cmId.toString(), discipline: disciplineId.toString() },
  }
}
