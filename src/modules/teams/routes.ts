import { Location, RouteConfig } from "vue-router"

import * as roles from "@/components/auth/roles"
import {
  convertParams,
  createTeam,
  manageTeam,
  manageTeams,
  teams as teamsRoute,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"

import { members, root as membersRoot } from "./members/routes"

/** Public routes */
const teamsView = () =>
  import(/* webpackChunkName: "teams" */ "./views/Teams.vue")

const teamView = () =>
  import(/* webpackChunkName: "teams" */ "./views/Team.vue")

/** Management routes */
const manageTeamView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageTeam.vue")

const manageTeamsView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageTeams.vue")

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }

export const teams = [
  {
    ...createTeam,
    component: manageTeamView,
    meta,
    path: "/team/manage/new",
  },
  {
    ...manageTeam,
    component: manageTeamView,
    meta,
    path: "/team/manage/:team(\\d+)",
  },
  {
    ...manageTeams,
    component: manageTeamsView,
    meta,
    path: "/teams/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
  {
    component: teamView,
    path: "/team/:team(\\d+)",
    props: true,
    children: [...members]
  },
  {
    ...teamsRoute,
    component: teamsView,
    path: "/teams/:page(\\d+)?/:sort?/:direction?",
  },
  ...membersRoot,
] as RouteConfig[]
