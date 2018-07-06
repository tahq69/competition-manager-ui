import { RouteConfig } from "vue-router";

import { PagingParams } from "@/typings";
import {
  competitions,
  convertParams,
  manageCompetitions
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
    path: "/competitions/manage/:page(\\d+)/:sort/:direction/:perPage(\\d+)",
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

export const competitionsRoute = (p?: { page: number | string }) => ({
  ...competitions,
  params: convertParams(Object.assign({ page: 1 }, p))
});

export const manageCompetitionsRoute = (p?: PagingParams) => ({
  ...manageCompetitions,
  params: convertParams(
    Object.assign({ page: 1, perPage: 10, sort: "id", direction: "desc" }, p)
  )
});
