import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
import {
  createTeam,
  createTeamMember,
  editTeam,
  editTeamMember,
  listTeamMembers,
  listTeams,
  publicTeamDetails,
} from "@/Router/Routes"

import ManageMember from "./ManageMember.vue"
import ManageMembers from "./ManageMembers.vue"
import ManageTeam from "./ManageTeam.vue"
import ManageTeams from "./ManageTeams.vue"

const meta = { requiresAuth: true, requiresRoles: [roles.CREATE_TEAMS] }

export default {
  path: "/teams",
  component: Wrapper,
  children: [
    { path: "new", component: ManageTeam, meta, ...createTeam },
    { path: "edit/:id(\\d+)", component: ManageTeam, meta, ...editTeam },
    {
      path: "manage/:page(\\d+)?/:sort?/:order?",
      component: ManageTeams,
      meta,
      ...listTeams,
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
      ...editTeamMember,
    },
    {
      path: ":team(\\d+)/members/:page(\\d+)?/:sort?/:order?",
      component: ManageMembers,
      meta,
      ...listTeamMembers,
    },
  ],
}
