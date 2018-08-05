import { RouteConfig } from "vue-router";
import "@/modules/teams/components/links";

import { Id, PagingParams } from "@/typings";
import {
  createTeam,
  manageTeam,
  manageTeams,
  teamMembers,
  teams as teamsRoute,
  createRoute
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
    path: "/team/manage/:team(\\d+)",
    props: true
  },
  {
    ...manageTeams,
    component: manageTeamsView,
    meta,
    path: "/teams/manage/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
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

export const manageTeamsRoute = (p?: PagingParams) =>
  createRoute(manageTeams, p);

export const createTeamRoute = () => ({ ...createTeam });

export const manageTeamRoute = (p: { team: Id }) =>
  createRoute(manageTeam, p, {});

export const teamRoute = (p: { team: Id } & PagingParams) =>
  createRoute(teamMembers, p);

export const getTeamsRoute = (p?: PagingParams) =>
  createRoute(teamsRoute, p, { page: 1, sort: "id", direction: "descending" });
