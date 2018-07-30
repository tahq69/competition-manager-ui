import { RouteConfig } from "vue-router";

import { Id } from "@/typings";

import * as roles from "@/components/auth/roles";
import {
  competitionDetails,
  convertParams,
  manageCompetitionDetails
} from "@/router/routes";

/** Public views */
import detailsView from "./views/Details.vue";

/** Management views */
import manageDetailsView from "./views/ManageDetails.vue";

export const root: RouteConfig[] = [
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "/competition/manage/:cm(\\d+)",
    component: manageDetailsView,
    props: true
  }
];

export const details: RouteConfig[] = [
  {
    ...competitionDetails,
    path: "/competition/:cm(\\d+)",
    component: detailsView,
    props: true
  }
];

export const cmDetailsRoute = (p: { cm: Id }) => ({
  ...competitionDetails,
  params: convertParams(p)
});

export const manageCmDetailsRoute = (p: { cm: Id }) => ({
  ...manageCompetitionDetails,
  params: convertParams(p)
});
