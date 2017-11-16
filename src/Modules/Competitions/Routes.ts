import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
import {
  createCompetition,
  manageCompetition,
  manageCompetitions,
} from "@/Router/Routes"

const ManageCompetition = () => import("./ManageCompetition.vue")
const ManageCompetitions = () => import("./ManageCompetitions.vue")

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
      ...manageCompetitions,
    },
    {
      path: "edit/:id(\\d+)",
      component: ManageCompetition,
      meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
      ...manageCompetition,
    },
  ],
}
