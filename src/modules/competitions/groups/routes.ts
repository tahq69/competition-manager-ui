import { RouteConfig } from "vue-router";

import {
  competitionGroups,
  createCategory,
  createGroup,
  createRoute,
  manageCategory,
  manageGroup,
  manageGroups
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
import manageGroupView from "@/modules/competitions/groups/views/ManageGroupForm.vue";
import manageCategoryView from "@/modules/competitions/groups/views/ManageCategoryForm.vue";

export const groups: RouteConfig[] = [
  {
    ...competitionGroups,
    component: groupsView,
    path: "groups",
    props: true,
    children: [
      {
        ...createGroup,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageGroupView,
        path: "new",
        props: true
      },
      {
        ...createCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageCategoryView,
        path: ":group(\\d+)/category/new",
        props: true
      },
      {
        ...manageCategory,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageCategoryView,
        path: ":group(\\d+)/category/manage/:category(\\d+)",
        props: true
      },
      {
        ...manageGroup,
        meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
        component: manageGroupView,
        path: "manage/:group(\\d+)",
        props: true
      }
    ]
  }
];

export const cmGroups = (p: DisciplineRouteParams) =>
  createRoute(competitionGroups, p, {});

export const manageCmGroupsRoute = (p: DisciplineRouteParams) =>
  createRoute(manageGroups, p, {});

export const createCmGroup = (p: DisciplineRouteParams) =>
  createRoute(createGroup, p, {});

export const manageCmGroupRoute = (p: GroupRouteParams) =>
  createRoute(manageGroup, p, {});

export const createCategoryRoute = (p: GroupRouteParams) =>
  createRoute(createCategory, p, {});

export const manageCategoryRoute = (p: CategoryRouteParams) =>
  createRoute(manageCategory, p, {});
