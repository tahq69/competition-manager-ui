import { RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  competitions,
  convertParams,
  manageCompetitions
} from "@/router/routes";
import { Id, IRouteParams } from "@/typings";

import { areas } from "./areas/routes";
import { details, root as detailsRoot } from "./details/routes";
import { disciplines, root as disciplinesRoot } from "./disciplines/routes";

/** Public routes */
const competitionsView = () =>
  import(/* webpackChunkName: "cm" */ "./views/Competitions.vue");
const competition = () =>
  import(/* webpackChunkName: "cm" */ "./views/Competition.vue");

/** Management routes */
const manageCms = () =>
  import(/* webpackChunkName: "cm" */ "./views/ManageCompetitions.vue");

export const root: RouteConfig[] = [
  {
    ...manageCompetitions,
    component: manageCms,
    meta: { auth: true, roles: [roles.SUPER_ADMIN] },
    path: "/competitions/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?"
  },
  {
    ...competitions,
    component: competitionsView,
    path: "/competitions/:page(\\d+)?"
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

export const competitionsRoute = () => competitions;

export const manageCompetitionsRoute = () => manageCompetitions;
