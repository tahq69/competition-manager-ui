import { RouteConfig } from "vue-router";
import "@/modules/competitions/components/links";

import {
  competitionDetails,
  competitions,
  createRoute,
  manageCompetitionDetails,
  manageCompetitions
} from "@/router/routes";
import { PagingParams, Id } from "@/typings";
import * as roles from "@/components/auth/roles";

import {
  disciplines,
  root as disciplinesRoot
} from "@/modules/competitions/disciplines/routes";
import { areas, root as areasRoot } from "@/modules/competitions/areas/routes";

/** Public routes */
import competitionsView from "@/modules/competitions/views/Competitions.vue";
import competitionView from "@/modules/competitions/views/Competition.vue";
import detailsView from "@/modules/competitions/views/Details.vue";

/** Management routes */
import manageCompetitionsView from "@/modules/competitions/views/ManageCompetitions.vue";
import manageCompetitionView from "@/modules/competitions/views/ManageDetails.vue";

export const root: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCompetitionsView,
    meta: { auth: true, roles: [roles.SUPER_ADMIN] },
    path: "/competitions/manage/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
    props: true
  },
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "/competition/manage/:cm(\\d+)",
    component: manageCompetitionView,
    props: true
  },
  {
    ...competitions,
    component: competitionsView,
    path: "/competitions/:page(\\d+)",
    props: true
  },
  {
    component: competitionView,
    path: "/competition/:cm(\\d+)",
    props: true,
    children: [
      {
        ...competitionDetails,
        path: "",
        component: detailsView,
        props: true
      },
      ...disciplines,
      ...areas
    ]
  },
  ...disciplinesRoot,
  ...areasRoot
];

export const competitionsRoute = (p?: { page: number | string }) =>
  createRoute(competitions, p, { page: 1 });

export const manageCompetitionsRoute = (p?: PagingParams) =>
  createRoute(manageCompetitions, p);

export const cmDetailsRoute = (p: { cm: Id }) =>
  createRoute(competitionDetails, p, {});

export const manageCmDetailsRoute = (p: { cm: Id }) =>
  createRoute(manageCompetitionDetails, p, {});
