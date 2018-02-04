import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionDisciplineGroups,
  convertParams,
  createCompetitionDisciplineCategory,
  createCompetitionDisciplineGroup,
  manageCompetitionDisciplineCategory,
  manageCompetitionDisciplineGroup,
  manageCompetitionDisciplineGroups,
} from "@/Router/Routes"
import { Id, IRouteParams } from "@/types"

/** Public routes */
const groupsView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./DisciplineGroups.vue")

/** Management routes */
const manageGroups = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageGroups.vue")

const manageGroup = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageGroupForm.vue")

const manageCategory = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageCategoryForm.vue")

export const groups: RouteConfig[] = [
  {
    ...competitionDisciplineGroups,
    component: groupsView,
    path: "groups",
    props: true,
  },
  {
    ...manageCompetitionDisciplineGroups,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    component: manageGroups,
    path: "groups/manage",
    props: true,
    children: [
      {
        ...createCompetitionDisciplineGroup,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        path: "new",
        props: true,
      },
      {
        ...manageCompetitionDisciplineGroup,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        path: ":group(\\d+)/edit",
        props: true,
      },
      {
        ...createCompetitionDisciplineCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        path: ":group(\\d+)/category/new",
        props: true,
      },
      {
        ...manageCompetitionDisciplineCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        path: ":group(\\d+)/category/:category(\\d+)/edit",
        props: true,
      },
    ],
  },
]

export const getGroups = (p: { cm: Id, discipline: Id }) => {
  return {
    ...competitionDisciplineGroups,
    params: convertParams(p),
  }
}

export const getCreateGroup = (p: { cm: Id, discipline: Id }) => {
  return {
    ...createCompetitionDisciplineGroup,
    params: convertParams(p),
  }
}

export const getManageGroup = (p: { cm: Id, discipline: Id, group: Id }) => {
  return {
    ...createCompetitionDisciplineGroup,
    params: convertParams(p),
  }
}

export const getCreateCategory = (p: { cm: Id, discipline: Id, group: Id }) => {
  return {
    ...createCompetitionDisciplineCategory,
    params: convertParams(p),
  }
}

interface ICategoryParams extends IRouteParams {
  cm: Id
  discipline: Id
  group: Id
  category: Id
}

export const getManageCategory = (p: ICategoryParams) => {
  return {
    ...manageCompetitionDisciplineCategory,
    params: convertParams(p),
  }
}
