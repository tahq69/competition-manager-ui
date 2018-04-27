import * as roles from "@/components/auth/roles";
import { Id, IRouteParams } from "@/typings";
import {
  convertParams,
  createCompetition,
  teamCompetitions
} from "@/router/routes";

/** Public routes */
const competitionsView = () =>
  import(/* webpackChunkName: "teams" */ "./views/Competitions.vue");

/** Management routes */
const createCmView = () =>
  import(/* webpackChunkName: "teams" */ "./views/CreateCompetition.vue");

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
