import * as roles from "@/components/auth/roles";
import {
  convertParams,
  createTeamMember,
  manageTeamMember,
  manageTeamMembers,
  teamMembers
} from "@/router/routes";
import { Id, IRouteParams, PagingParams } from "@/typings";

/** Public routes */
import membersView from "./views/Members.vue";

/** Management routes */
import manageMemberView from "./views/ManageMember.vue";
import manageMembersView from "./views/ManageMembers.vue";

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] };

export const members = [
  {
    ...teamMembers,
    path: "members/:page(\\d+)/:sort/:direction/:perPage(\\d+)",
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
      "/team/:team(\\d+)/members/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?"
  }
];

export const teamMembersRoute = (p: { team: Id } & PagingParams) => ({
  ...teamMembers,
  params: convertParams(
    Object.assign({ page: 1, perPage: 10, sort: "id", direction: "desc" }, p)
  )
});

export const manageTeamMembersRoute = (p: { team: Id } & PagingParams) => ({
  ...manageTeamMembers,
  params: convertParams(
    Object.assign({ page: 1, perPage: 10, sort: "id", direction: "desc" }, p)
  )
});

export const createTeamMemberRoute = (p: { team: Id }) => ({
  ...createTeamMember,
  params: convertParams(p)
});

export const manageTeamMemberRoute = (p: { team: Id; member: Id }) => ({
  ...manageTeamMember,
  params: convertParams(p)
});
