import { Location, Route, RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  competitionArea,
  competitionAreas,
  createCompetitionArea,
  createRoute,
  manageCompetitionArea
} from "@/router/routes";
import { Id } from "@/typings";

/** Public routes */
import areasView from "./views/Areas.vue";
import areaView from "./views/Area.vue";

/** Management routes */
import manageAreaView from "./views/ManageArea.vue";

export const areas: RouteConfig[] = [
  {
    ...competitionAreas,
    path: "areas",
    component: areasView,
    props: true
  }
];

export const root: RouteConfig[] = [
  {
    ...competitionArea,
    path: "/competition/:cm(\\d+)/area/:area(\\d+)",
    component: areaView,
    props: true
  },
  {
    ...createCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "/competition/:cm(\\d+)/area/manage/new",
    component: manageAreaView,
    props: true
  },
  {
    ...manageCompetitionArea,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_AREAS] },
    path: "/competition/:cm(\\d+)/area/manage/:area(\\d+)",
    component: manageAreaView,
    props: true
  }
];

export const competitionAreasRoute = (p: { cm: Id }) =>
  createRoute(competitionAreas, p, {});

export const areaRoute = (p: { cm: Id; area: Id }) =>
  createRoute(competitionArea, p, {});
