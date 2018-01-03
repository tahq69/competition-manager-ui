import * as roles from "@/Components/Auth/Roles"
import {
  createTeam,
  createTeamMember,
  Location,
  manageTeam,
  manageTeamMember,
  manageTeamMembers,
  manageTeams,
  RouteConfig,
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
    ...(createTeam as Location),
    component: manageTeamVue,
    meta,
    path: "/teams/new",
  } as RouteConfig,
  {
    ...(manageTeam as Location),
    component: manageTeamVue,
    meta,
    path: "/teams/edit/:id(\\d+)",
  } as RouteConfig,
  {
    ...(manageTeams as Location),
    component: manageTeamsVue,
    meta,
    path: "/teams/manage/:page(\\d+)?/:sort?/:direction?/:perpage?",
  } as RouteConfig,
  {
    ...(createTeamMember as Location),
    component: manageMemberVue,
    meta,
    path: "/teams/:team(\\d+)/members/new",
  } as RouteConfig,
  {
    ...(manageTeamMember as Location),
    component: manageMemberVue,
    meta,
    path: "/teams/:team(\\d+)/members/edit/:id(\\d+)",
  } as RouteConfig,
  {
    ...(manageTeamMembers as Location),
    component: manageMembersVue,
    meta,
    path:
      "/teams/:team(\\d+)/members/:page(\\d+)?/:sort?/:direction?/:perpage?",
  } as RouteConfig,
]
