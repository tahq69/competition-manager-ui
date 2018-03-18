import * as roles from "@/components/auth/roles"
import {
  convertParams,
  teamCompetitions,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"


/** Public routes */
const cimpetitionsView = () =>
  import(/* webpackChunkName: "teams" */ "./views/Competitions.vue")

/** Management routes */

export const competitions = [
  {
    ...teamCompetitions,
    path: "competitions/:page(\\d+)?/:sort?/:direction?/:perPage(\\d+)?",
    component: cimpetitionsView,
    props: true
  }
]

export const root = []

export const getTeamCompetitions = (p: { team: Id }) => {
  return {
    ...teamCompetitions,
    params: convertParams(p),
  }
}
