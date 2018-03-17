import * as roles from "@/components/auth/roles"
import {
  convertParams,
  createTeamMember,
  manageTeamMember,
  manageTeamMembers,
  teamMembers,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"


/** Public routes */
const teamMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./views/TeamMembers.vue")


/** Management routes */
const manageMemberView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageMember.vue")

const manageMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./views/ManageMembers.vue")

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }


export const members = [
  {
    ...teamMembers,
    path: "members/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
    component: teamMembersView,
    props: true
  }
]

export const root = [
  {
    ...createTeamMember,
    component: manageMemberView,
    props: true,
    meta,
    path: "/team/:team(\\d+)/member/manage/new",
  },
  {
    ...manageTeamMember,
    component: manageMemberView,
    props: true,
    meta,
    path: "/team/:team(\\d+)/member/manage/:id(\\d+)",
  },
  {
    ...manageTeamMembers,
    component: manageMembersView,
    props: true,
    meta,
    path: "/team/:team(\\d+)/members/manage/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
  },
]

export const getTeamMembers = (p: { team: Id }) => {
  return {
    ...teamMembers,
    params: convertParams(p),
  }
}
