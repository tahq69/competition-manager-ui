import * as roles from "@/components/auth/roles"
import {
  competitionDetails,
  convertParams,
  manageCompetitionDetails,
} from "@/router/routes"
import { Id, IRouteParams } from "@/types"

/** Public routes */
const detailsView = () =>
  import (/* webpackChunkName: "cm-details" */ "./views/Details.vue")

/** Management routes */
const manageDetailsView = () =>
  import (/* webpackChunkName: "cm-details" */ "./views/ManageDetails.vue")

export const root = [
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "/competition/manage/:cm(\\d+)",
    component: manageDetailsView,
    props: true,
  },
]

export const details = [
  {
    ...competitionDetails,
    path: "/competition/:cm(\\d+)",
    component: detailsView,
    props: true,
  },
]

export const getCompetitionDetails = (p: { cm: Id }) => {
  return {
    ...competitionDetails,
    params: convertParams(p),
  }
}

export const getManageCompetitionDetails = (p: { cm: Id }) => {
  return {
    ...manageCompetitionDetails,
    params: convertParams(p),
  }
}
