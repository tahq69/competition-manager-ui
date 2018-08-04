import { RouteConfig } from "vue-router";

import { PagingParams } from "@/typings";
import {
  competitions,
  convertParams,
  manageCompetitions,
  createRoute
} from "@/router/routes";
import * as roles from "@/components/auth/roles";

import { areas } from "./areas/routes";
import { details, root as detailsRoot } from "./details/routes";
import { disciplines, root as disciplinesRoot } from "./disciplines/routes";

/** Public routes */
import competitionsView from "./views/Competitions.vue";
import competition from "./views/Competition.vue";

/** Management routes */
import manageCms from "./views/ManageCompetitions.vue";

export const root: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { auth: true, roles: [roles.SUPER_ADMIN] },
    path: "/competitions/manage/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
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
    children: [...details, ...disciplines, ...areas]
  },
  ...detailsRoot,
  ...disciplinesRoot
];

export const competitionsRoute = (p?: { page: number | string }) =>
  createRoute(competitions, p, { page: 1 });

export const manageCompetitionsRoute = (p?: PagingParams) =>
  createRoute(manageCompetitions, p);
