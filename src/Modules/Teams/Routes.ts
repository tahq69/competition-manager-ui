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
} from "@/Router/Routes"
import { Id, IRouteParams } from "@/types"

/** Public routes */
const teamsView = () => import(/* webpackChunkName: "teams" */ "./Teams.vue")

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
    ...createTeam,
    component: manageTeamView,
    meta,
    path: "/teams/new",
  },
  {
    ...teamDetails,
    component: teamsView,
    meta,
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
