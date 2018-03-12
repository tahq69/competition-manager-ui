import { Location, RouteConfig } from "vue-router"

import * as roles from "@/components/auth/roles"
import {
  convertParams,
  createTeam,
  createTeamMember,
  manageTeam,
  manageTeamMember,
  manageTeamMembers,
  manageTeams,
  teams as teamsRoute,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"

import { members } from "./members/routes"

/** Public routes */
const teamsView = () =>
  import(/* webpackChunkName: "teams" */ "./views/Teams.vue")

const teamView = () =>
  import(/* webpackChunkName: "teams" */ "./views/Team.vue")

/** Management routes */
const manageMemberView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageMember.vue")

const manageMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageMembers.vue")

const manageTeamView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageTeam.vue")

const manageTeamsView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageTeams.vue")

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }

export const teams = [
  {
    ...manageTeam,
    component: manageTeamView,
    meta,
    path: "/teams/edit/:team(\\d+)",
  },
  {
    ...createTeam,
    component: manageTeamView,
    meta,
    path: "/teams/new",
  },
  {
    ...manageTeams,
    component: manageTeamsView,
    meta,
    path: "/teams/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
  {
    component: teamView,
    path: "/teams/:team(\\d+)",
    props: true,
    children: [...members]
  },
  {
    ...teamsRoute,
    component: teamsView,
    path: "/teams/:page(\\d+)?/:sort?/:direction?",
  },
  {
    ...createTeamMember,
    component: manageMemberView,
    meta,
    path: "/teams/:team(\\d+)/members/new",
  },
  {
    ...manageTeamMember,
    component: manageMemberView,
    meta,
    path: "/teams/:team(\\d+)/members/edit/:id(\\d+)",
  },
  {
    ...manageTeamMembers,
    component: manageMembersView,
    meta,
    path:
      "/teams/:team(\\d+)/members/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
] as RouteConfig[]
