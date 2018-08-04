import { RouteConfig } from "vue-router";

import { Id } from "@/typings";
import {
  competitionDisciplineGroups,
  createCompetitionDisciplineCategory,
  createCompetitionDisciplineGroup,
  createRoute,
  manageCompetitionDisciplineCategory,
  manageCompetitionDisciplineGroup,
  manageCompetitionDisciplineGroups
} from "@/router/routes";
import * as roles from "@/components/auth/roles";

import {
  CategoryRouteParams,
  DisciplineRouteParams,
  GroupRouteParams
} from "@/modules/competitions/groups/typings";

/** Public routes */
import groupsView from "@/modules/competitions/groups/views/DisciplineGroups.vue";

/** Management routes */
import manageGroups from "@/modules/competitions/groups/views/ManageGroups.vue";
import manageGroup from "@/modules/competitions/groups/views/ManageGroupForm.vue";
import manageCategory from "@/modules/competitions/groups/views/ManageCategoryForm.vue";

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
        props: true
      },
      {
        ...createCompetitionDisciplineCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageCategory,
        path: ":group(\\d+)/category/manage/new",
        props: true
      },
      {
        ...manageCompetitionDisciplineCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageCategory,
        path: ":group(\\d+)/category/manage/:category(\\d+)",
        props: true
      },
      {
        ...manageCompetitionDisciplineGroup,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageGroup,
        path: ":group(\\d+)",
        props: true
      }
    ]
  },
  {
    ...competitionDisciplineGroups,
    component: groupsView,
    path: "groups",
    props: true
  }
];

export const cmGroups = (p: DisciplineRouteParams) =>
  createRoute(competitionDisciplineGroups, p, {});

export const manageCmGroupsRoute = (p: DisciplineRouteParams) =>
  createRoute(manageCompetitionDisciplineGroups, p, {});

export const createCmGroup = (p: DisciplineRouteParams) =>
  createRoute(createCompetitionDisciplineGroup, p, {});

export const manageCmGroupRoute = (p: GroupRouteParams) =>
  createRoute(manageCompetitionDisciplineGroup, p, {});

export const createCategoryRoute = (p: GroupRouteParams) =>
  createRoute(createCompetitionDisciplineCategory, p, {});

export const manageCategoryRoute = (p: CategoryRouteParams) =>
  createRoute(manageCompetitionDisciplineCategory, p, {});
