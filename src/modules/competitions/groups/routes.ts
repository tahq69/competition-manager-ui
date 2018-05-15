import { RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  competitionDisciplineGroups,
  convertParams,
  createCompetitionDisciplineCategory,
  createCompetitionDisciplineGroup,
  manageCompetitionDisciplineCategory,
  manageCompetitionDisciplineGroup,
  manageCompetitionDisciplineGroups
} from "@/router/routes";
import { Id, IRouteParams } from "@/typings";

/** Public routes */
import groupsView from "./views/DisciplineGroups.vue";

/** Management routes */
import manageGroups from "./views/ManageGroups.vue";
import manageGroup from "./views/ManageGroupForm.vue";
import manageCategory from "./views/ManageCategoryForm.vue";

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

export const cmGroups = (p: { cm: Id; discipline: Id }) => ({
  ...competitionDisciplineGroups,
  params: convertParams(p)
});

export const manageCmGroupsRoute = (p: { cm: Id; discipline: Id }) => ({
  ...manageCompetitionDisciplineGroups,
  params: convertParams(p)
});

export const createCmGroup = (p: { cm: Id; discipline: Id }) => ({
  ...createCompetitionDisciplineGroup,
  params: convertParams(p)
});

export const manageCmGroupRoute = (p: {
  cm: Id;
  discipline: Id;
  group: Id;
}) => ({
  ...manageCompetitionDisciplineGroup,
  params: convertParams(p)
});

export const createCategoryRoute = (p: {
  cm: Id;
  discipline: Id;
  group: Id;
}) => ({
  ...createCompetitionDisciplineCategory,
  params: convertParams(p)
});

export const manageCategoryRoute = (p: {
  cm: Id;
  discipline: Id;
  group: Id;
  category: Id;
}) => ({
  ...manageCompetitionDisciplineCategory,
  params: convertParams(p)
});
