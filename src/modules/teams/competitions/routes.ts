import * as roles from "@/components/auth/roles";
import { Id, PagingParams } from "@/typings";
import {
  createCompetition,
  createRoute,
  manageCompetitionDetails,
  teamCompetitions
} from "@/router/routes";

/** Public routes */
import competitionsView from "@/modules/teams/competitions/views/Competitions.vue";

/** Management routes */
import createCmView from "@/modules/teams/competitions/views/CreateCompetition.vue";

export const competitions = [
  {
    ...teamCompetitions,
    path: "competitions/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
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

export const teamCompetitionsRoute = (p: { team: Id } & PagingParams) =>
  createRoute(teamCompetitions, p);

export const createCmRoute = (p: { team: Id }) =>
  createRoute(createCompetition, p);

export const manageCmDetailsRoute = (p: { cm: Id }) =>
  createRoute(manageCompetitionDetails, p);
