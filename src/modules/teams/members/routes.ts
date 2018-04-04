import * as roles from "@/components/auth/roles";
import {
  convertParams,
  createTeamMember,
  manageTeamMember,
  manageTeamMembers,
  teamMembers
} from "@/router/routes";
import { Id, IRouteParams } from "@/typings";

/** Public routes */
const teamMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./views/TeamMembers.vue");

/** Management routes */
const manageMemberView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageMember.vue");

const manageMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageMembers.vue");

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] };

export const members = [
  {
    ...teamMembers,
    path: "members/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
    component: teamMembersView,
    props: true
  }
];

export const root = [
  {
    ...createTeamMember,
    component: manageMemberView,
    props: true,
    meta,
    path: "/team/:team(\\d+)/member/manage/new"
  },
  {
    ...manageTeamMember,
    component: manageMemberView,
    props: true,
    meta,
    path: "/team/:team(\\d+)/member/manage/:member(\\d+)"
  },
  {
    ...manageTeamMembers,
    component: manageMembersView,
    props: true,
    meta,
    path:
      "/team/:team(\\d+)/members/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?"
  }
];

export const teamMembersRoute = (p: { team: Id }) => ({
  ...teamMembers,
  params: convertParams(p)
});

export const manageTeamMembersRoute = (p: { team: Id }) => ({
  ...manageTeamMembers,
  params: convertParams(p)
});

export const createTeamMemberRoute = (p: { team: Id }) => ({
  ...createTeamMember,
  params: convertParams(p)
});

export const manageTeamMemberRoute = (p: { team: Id; member: Id }) => ({
  ...manageTeamMember,
  params: convertParams(p)
});
