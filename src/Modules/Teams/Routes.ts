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

const ManageMember = () => import("./ManageMember.vue")
const ManageMembers = () => import("./ManageMembers.vue")
const ManageTeam = () => import("./ManageTeam.vue")
const ManageTeams = () => import("./ManageTeams.vue")

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }

export default {
  path: "/teams",
  component: Wrapper,
  children: [
    { path: "new", component: ManageTeam, meta, ...createTeam },
    { path: "edit/:id(\\d+)", component: ManageTeam, meta, ...manageTeam },
    {
      path: "manage/:page(\\d+)?/:sort?/:direction?/:perpage?",
      component: ManageTeams,
      meta,
      ...manageTeams,
    },
    {
      path: ":team(\\d+)/members/new",
      component: ManageMember,
      meta,
      ...createTeamMember,
    },
    {
      path: ":team(\\d+)/members/edit/:id(\\d+)",
      component: ManageMember,
      meta,
      ...manageTeamMember,
    },
    {
      path: ":team(\\d+)/members/:page(\\d+)?/:sort?/:direction?/:perpage?",
      component: ManageMembers,
      meta,
      ...manageTeamMembers,
    },
  ],
}
