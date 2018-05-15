import * as roles from "@/components/auth/roles";
import { Id, IRouteParams } from "@/typings";
import {
  convertParams,
  createCompetition,
  manageCompetitionDetails,
  teamCompetitions
} from "@/router/routes";

/** Public routes */
import competitionsView from "./views/Competitions.vue";

/** Management routes */
import createCmView from "./views/CreateCompetition.vue";

export const competitions = [
  {
    ...teamCompetitions,
    path: "competitions/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
    component: competitionsView,
    props: true
  },
  {
    ...createCompetition,
    meta: { auth: true, teamRoles: [roles.CREATE_COMPETITIONS] },
    path: "competition/manage/new",
    component: createCmView,
    props: true
  }
];

export const root = [];

export const teamCompetitionsRoute = (p: { team: Id }) => ({
  ...teamCompetitions,
  params: convertParams(p)
});

export const createCmRoute = (p: { team: Id }) => ({
  ...createCompetition,
  params: convertParams(p)
});

export const manageCmDetailsRoute = (p: { cm: Id }) => ({
  ...manageCompetitionDetails,
  params: convertParams(p)
});
