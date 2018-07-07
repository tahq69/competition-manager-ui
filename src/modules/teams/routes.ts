import { RouteConfig } from "vue-router";

import { Id, PagingParams } from "@/typings";
import {
  convertParams,
  createTeam,
  manageTeam,
  manageTeams,
  teamMembers,
  teams as teamsRoute
} from "@/router/routes";
import * as roles from "@/components/auth/roles";

import {
  competitions,
  root as competitionsRoot
} from "#/teams/competitions/routes";
import { members, root as membersRoot } from "#/teams/members/routes";

/** Public routes */
import teamsView from "#/teams/views/Teams.vue";
import teamView from "#/teams/views/Team.vue";

/** Management routes */
import manageTeamView from "#/teams/views/ManageTeam.vue";
import manageTeamsView from "#/teams/views/ManageTeams.vue";

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

export const manageTeamsRoute = (p?: PagingParams) => ({
  ...manageTeams,
  params: convertParams(
    Object.assign({ page: 1, perPage: 10, sort: "id", direction: "desc" }, p)
  )
});

export const createTeamRoute = () => {
  return { ...createTeam };
};

export const manageTeamRoute = (p: { team: Id }) => {
  return { ...manageTeam, params: convertParams(p) };
};

export const teamRoute = (p: { team: Id } & PagingParams) => ({
  ...teamMembers,
  params: convertParams(
    Object.assign({ page: 1, perPage: 10, sort: "id", direction: "desc" }, p)
  )
});

export const getTeamsRoute = (p?: PagingParams) => ({
  ...teamsRoute,
  params: convertParams(
    Object.assign({ page: 1, sort: "id", direction: "desc" }, p)
  )
});
