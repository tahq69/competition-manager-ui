import { Location, Route, RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  competitionArea,
  competitionAreas,
  convertParams,
  createCompetitionArea,
  manageCompetitionArea
} from "@/router/routes";
import { Id } from "@/typings";

/** Public routes */
const areasView = () =>
  import(/* webpackChunkName: "cm-areas" */ "./views/Areas.vue");
const areaView = () =>
  import(/* webpackChunkName: "cm-areas" */ "./views/Area.vue");

/** Management routes */
const manageAreaView = () =>
  import(/* webpackChunkName: "cm-areas" */ "./views/ManageArea.vue");

export const areas: RouteConfig[] = [
  {
    ...competitionAreas,
    path: "areas",
    component: areasView,
    props: true
  },
  {
    ...competitionArea,
    path: "area/:area(\\d+)",
    component: areaView,
    props: true
  },
  {
    ...createCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "area/manage/new",
    component: manageAreaView,
    props: true
  },
  {
    ...manageCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "area/manage/:area(\\d+)",
    component: manageAreaView,
    props: true
  }
];

export const competitionAreasRoute = (p: { cm: Id }) => ({
  ...competitionAreas,
  params: convertParams(p)
});
