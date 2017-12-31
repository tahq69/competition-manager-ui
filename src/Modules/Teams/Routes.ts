import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
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

export default {
  path: "/teams",
  component: Wrapper,
  children: [
    { path: "new", component: manageTeamVue, meta, ...createTeam },
    { path: "edit/:id(\\d+)", component: manageTeamVue, meta, ...manageTeam },
    {
      path: "manage/:page(\\d+)?/:sort?/:direction?/:perpage?",
      component: manageTeamsVue,
      meta,
      ...manageTeams,
    },
    {
      path: ":team(\\d+)/members/new",
      component: manageMemberVue,
      meta,
      ...createTeamMember,
    },
    {
      path: ":team(\\d+)/members/edit/:id(\\d+)",
      component: manageMemberVue,
      meta,
      ...manageTeamMember,
    },
    {
      path: ":team(\\d+)/members/:page(\\d+)?/:sort?/:direction?/:perpage?",
      component: manageMembersVue,
      meta,
      ...manageTeamMembers,
    },
  ],
}
