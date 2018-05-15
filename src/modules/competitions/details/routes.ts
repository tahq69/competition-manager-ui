import { RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  competitionDetails,
  convertParams,
  manageCompetitionDetails
} from "@/router/routes";
import { Id, IRouteParams } from "@/typings";

/** Public views */
import detailsView from "./views/Details.vue";

/** Management views */
import manageDetailsView from "./views/ManageDetails.vue";

export const root: RouteConfig[] = [];

export const details = [
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "/competition/:cm(\\d+)/manage",
    component: manageDetailsView,
    props: true
  },
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
