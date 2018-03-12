import * as roles from "@/components/auth/roles"
import {
  convertParams,
  teamMembers,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"


/** Public routes */
const teamMembersView = () =>
  import(/* webpackChunkName: "teams" */ "./views/TeamMembers.vue")

export const members = [
  {
    ...teamMembers,
    path: "",
    component: teamMembersView,
    props: true
  }
]

export const getTeamMembers = (p: { team: Id }) => {
  return {
    ...teamMembers,
    params: convertParams(p),
  }
}
