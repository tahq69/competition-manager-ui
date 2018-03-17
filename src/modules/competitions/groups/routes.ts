import { RouteConfig } from "vue-router"

import * as roles from "@/components/auth/roles"
import {
  competitionDisciplineGroups,
  convertParams,
  createCompetitionDisciplineCategory,
  createCompetitionDisciplineGroup,
  manageCompetitionDisciplineCategory,
  manageCompetitionDisciplineGroup,
  manageCompetitionDisciplineGroups,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"

/** Public routes */
const groupsView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/DisciplineGroups.vue")

/** Management routes */
const manageGroups = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/ManageGroups.vue")

const manageGroup = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/ManageGroupForm.vue")

const manageCategory = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./views/ManageCategoryForm.vue")

export const groups: RouteConfig[] = [
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
        component: manageGroup,
        path: "new",
        props: true,
      },
      {
        ...createCompetitionDisciplineCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageCategory,
        path: ":group(\\d+)/category/manage/new",
        props: true,
      },
      {
        ...manageCompetitionDisciplineCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageCategory,
        path: ":group(\\d+)/category/manage/:category(\\d+)",
        props: true,
      },
      {
        ...manageCompetitionDisciplineGroup,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageGroup,
        path: ":group(\\d+)",
        props: true,
      },
    ],
  },
  {
    ...competitionDisciplineGroups,
    component: groupsView,
    path: "groups",
    props: true,
  },
]

export const getGroups = (p: { cm: Id; discipline: Id }) => {
  return {
    ...competitionDisciplineGroups,
    params: convertParams(p),
  }
}

export const getCreateGroup = (p: { cm: Id; discipline: Id }) => {
  return {
    ...createCompetitionDisciplineGroup,
    params: convertParams(p),
  }
}

export const getManageGroup = (p: { cm: Id; discipline: Id; group: Id }) => {
  return {
    ...manageCompetitionDisciplineGroup,
    params: convertParams(p),
  }
}

export const getCreateCategory = (p: { cm: Id; discipline: Id; group: Id }) => {
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
