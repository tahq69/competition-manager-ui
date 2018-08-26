import { RouteConfig } from "vue-router";
import "@/modules/competitions/components/links";

import { PagingParams, Id } from "@/typings";
import {
  competitions,
  manageCompetitions,
  createRoute,
  competitionDetails,
  manageCompetitionDetails
} from "@/router/routes";
import * as roles from "@/components/auth/roles";

import { areas } from "@/modules/competitions/areas/routes";

import {
  disciplines,
  root as disciplinesRoot
} from "@/modules/competitions/disciplines/routes";

/** Public routes */
import competitionsView from "@/modules/competitions/views/Competitions.vue";
import competition from "@/modules/competitions/views/Competition.vue";
import detailsView from "./views/Details.vue";

/** Management routes */
import manageCms from "@/modules/competitions/views/ManageCompetitions.vue";
import manageDetailsView from "./views/ManageDetails.vue";

export const root: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { auth: true, roles: [roles.SUPER_ADMIN] },
    path: "/competitions/manage/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
    props: true
  },
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "/competition/manage/:cm(\\d+)",
    component: manageDetailsView,
    props: true
  },
  {
    ...competitions,
    component: competitionsView,
    path: "/competitions/:page(\\d+)",
    props: true
  },
  {
    component: competition,
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
  ...disciplinesRoot
];

export const competitionsRoute = (p?: { page: number | string }) =>
  createRoute(competitions, p, { page: 1 });

export const manageCompetitionsRoute = (p?: PagingParams) =>
  createRoute(manageCompetitions, p);

export const cmDetailsRoute = (p: { cm: Id }) =>
  createRoute(competitionDetails, p, {});

export const manageCmDetailsRoute = (p: { cm: Id }) =>
  createRoute(manageCompetitionDetails, p, {});
