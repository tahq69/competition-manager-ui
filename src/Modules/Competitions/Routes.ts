import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
import {
  createCompetition,
  editCompetition,
  listCompetitions,
} from "@/Router/Routes"

import ManageCompetition from "./ManageCompetition.vue"
import ManageCompetitions from "./ManageCompetitions.vue"

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]

export default {
  path: "/competitions",
  component: Wrapper,
  children: [
    {
      path: "new",
      component: ManageCompetition,
      meta: { requiresAuth, requiresRoles: createRole },
      ...createCompetition,
    },
    {
      path: "manage/:page(\\d+)?/:sort?/:order?",
      component: ManageCompetitions,
      meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
      ...listCompetitions,
    },
    {
      path: "edit/:id(\\d+)",
      component: ManageCompetition,
      meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
      ...editCompetition,
    },
  ],
}
