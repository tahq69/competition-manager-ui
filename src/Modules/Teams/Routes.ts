import { Location, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  createTeam,
  createTeamMember,
  manageTeam,
  manageTeamMember,
  manageTeamMembers,
  manageTeams,
  teamDetails,
} from "@/Router/Routes"

const manageMemberVue = () =>
  import(/* webpackChunkName: "teams" */ "./ManageMember.vue")

const manageMembersVue = () =>
  import(/* webpackChunkName: "teams" */ "./ManageMembers.vue")

const manageTeamVue = () =>
  import(/* webpackChunkName: "teams" */ "./ManageTeam.vue")

const manageTeamsVue = () =>
  import(/* webpackChunkName: "teams" */ "./ManageTeams.vue")

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }

export default [
  {
    ...createTeam,
    component: manageTeamVue,
    meta,
    path: "/teams/new",
  },
  {
    ...manageTeam,
    component: manageTeamVue,
    meta,
    path: "/teams/edit/:id(\\d+)",
  },
  {
    ...manageTeams,
    component: manageTeamsVue,
    meta,
    path: "/teams/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
  {
    ...createTeamMember,
    component: manageMemberVue,
    meta,
    path: "/teams/:team(\\d+)/members/new",
  },
  {
    ...manageTeamMember,
    component: manageMemberVue,
    meta,
    path: "/teams/:team(\\d+)/members/edit/:id(\\d+)",
  },
  {
    ...manageTeamMembers,
    component: manageMembersVue,
    meta,
    path:
      "/teams/:team(\\d+)/members/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
] as RouteConfig[]
