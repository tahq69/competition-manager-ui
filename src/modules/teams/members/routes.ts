import { Id, PagingParams } from "@/typings";
import {
  createRoute,
  createTeamMember,
  manageTeamMember,
  manageTeamMembers,
  teamMembers
} from "@/router/routes";
import * as roles from "@/components/auth/roles";

/** Public routes */
import membersView from "#/teams/members/views/Members.vue";

/** Management routes */
import manageMemberView from "#/teams/members/views/ManageMember.vue";
import manageMembersView from "#/teams/members/views/ManageMembers.vue";

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] };

export const members = [
  {
    ...teamMembers,
    path: "members/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
    component: membersView,
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
      "/team/:team(\\d+)/members/manage/:page(\\d+)/:sort/:direction/:pageSize(\\d+)"
  }
];

export const teamMembersRoute = (p: { team: Id } & PagingParams) =>
  createRoute(teamMembers, p);

export const manageTeamMembersRoute = (p: { team: Id } & PagingParams) =>
  createRoute(manageTeamMembers, p);

export const createTeamMemberRoute = (p: { team: Id }) =>
  createRoute(createTeamMember, p);

export const manageTeamMemberRoute = (p: { team: Id; member: Id }) =>
  createRoute(manageTeamMember, p);
