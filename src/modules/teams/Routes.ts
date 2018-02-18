import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  convertParams,
  createTeam,
  createTeamMember,
  manageTeam,
  manageTeamMember,
  manageTeamMembers,
  manageTeams,
  teamDetails,
  teams as teamsRoute,
} from "@/Router/Routes"
import { Id, IRouteParams } from "@/types"

/** Public routes */
const teamsView = () => import(/* webpackChunkName: "teams" */ "./Teams.vue")
const teamView = () => import(/* webpackChunkName: "teams" */ "./Team.vue")

/** Management routes */
const manageMemberView = () =>
  import(/* webpackChunkName: "teams" */ "./ManageMember.vue")

const manageMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./ManageMembers.vue")

const manageTeamView = () =>
  import(/* webpackChunkName: "teams" */ "./ManageTeam.vue")

const manageTeamsView = () =>
  import(/* webpackChunkName: "teams" */ "./ManageTeams.vue")

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }

export const teams = [
  {
    ...teamsRoute,
    component: teamsView,
    path: "/teams/:page(\\d+)?/:sort?/:direction?",
  },
  {
    ...createTeam,
    component: manageTeamView,
    meta,
    path: "/teams/new",
  },
  {
    ...teamDetails,
    component: teamView,
    path: "/teams/:team(\\d+)",
    props: true,
  },
  {
    ...manageTeam,
    component: manageTeamView,
    meta,
    path: "/teams/edit/:id(\\d+)",
  },
  {
    ...manageTeams,
    component: manageTeamsView,
    meta,
    path: "/teams/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
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

export function getTeamDetails(p: { team: Id }) {
  return {
    ...teamDetails,
    params: convertParams(p),
  }
}
