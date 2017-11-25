import * as roles from "@/Components/Auth/Roles"
import Wrapper from "@/Components/Wrapper.vue"
import {
  createCompetition,
  manageCompetition,
  manageCompetitions,
} from "@/Router/Routes"

const manageCm = () => import("./ManageCompetition.vue")
const manageCms = () => import("./ManageCompetitions.vue")

const requiresAuth = { requiresAuth: true }
const createRole = [roles.CREATE_COMPETITIONS]
const listRole = [roles.EDIT_COMPETITIONS]

export default {
  path: "/competitions",
  component: Wrapper,
  children: [
    {
      path: "new",
      component: manageCm,
      meta: { requiresAuth, requiresRoles: createRole },
      ...createCompetition,
    },
    {
      path: "manage/:page(\\d+)?/:sort?/:order?",
      component: manageCms,
      meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
      ...manageCompetitions,
    },
    {
      path: "edit/:id(\\d+)",
      component: manageCm,
      meta: { requiresAuth, requiresAnyOfRoles: [...createRole, ...listRole] },
      ...manageCompetition,
    },
  ],
}
