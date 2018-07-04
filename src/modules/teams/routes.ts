import { Location, RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  convertParams,
  createTeam,
  manageTeam,
  manageTeams,
  teamMembers,
  teams as teamsRoute
} from "@/router/routes";
import { Id } from "@/typings";

import { competitions, root as competitionsRoot } from "./competitions/routes";
import { members, root as membersRoot } from "./members/routes";

/** Public routes */
import teamsView from "./views/Teams.vue";
import teamView from "./views/Team.vue";

/** Management routes */
import manageTeamView from "./views/ManageTeam.vue";
import manageTeamsView from "./views/ManageTeams.vue";

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] };

export const teams = [
  {
    ...createTeam,
    component: manageTeamView,
    meta,
    path: "/team/manage/new"
  },
  {
    ...manageTeam,
    component: manageTeamView,
    meta,
    path: "/team/manage/:team(\\d+)"
  },
  {
    ...manageTeams,
    component: manageTeamsView,
    meta,
    path: "/teams/manage/:page(\\d+)/:sort/:direction/:perPage(\\d+)",
    props: true
  },
  {
    component: teamView,
    path: "/team/:team(\\d+)",
    props: true,
    children: [...members, ...competitions]
  },
  {
    ...teamsRoute,
    component: teamsView,
    path: "/teams/:page(\\d+)/:sort/:direction",
    props: true
  },
  ...membersRoot,
  ...competitionsRoot
] as RouteConfig[];

export const manageTeamsRoute = () => {
  return { ...manageTeams };
};

export const createTeamRoute = () => {
  return { ...createTeam };
};

export const manageTeamRoute = (p: { team: Id }) => {
  return { ...manageTeam, params: convertParams(p) };
};

export const teamRoute = (p: { team: Id }) => {
  return { ...teamMembers, params: convertParams(p) };
};
