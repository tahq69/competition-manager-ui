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
import competitionsView from "./views/Competitions.vue";
import competition from "./views/Competition.vue";

/** Management routes */
import manageCms from "./views/ManageCompetitions.vue";

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
