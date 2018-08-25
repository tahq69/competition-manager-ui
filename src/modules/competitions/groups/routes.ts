import { RouteConfig } from "vue-router";

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
import manageGroup from "@/modules/competitions/groups/views/ManageGroupForm.vue";
import manageCategory from "@/modules/competitions/groups/views/ManageCategoryForm.vue";

export const groups: RouteConfig[] = [
  {
    ...competitionDisciplineGroups,
    component: groupsView,
    path: "groups",
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
        path: ":group(\\d+)/category/new",
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
        path: "manage/:group(\\d+)",
        props: true
      }
    ]
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
