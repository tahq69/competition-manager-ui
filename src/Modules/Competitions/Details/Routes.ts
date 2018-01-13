import * as roles from "@/Components/Auth/Roles"
import { competitionDetails, manageCompetitionDetails } from "@/Router/Routes"

/** Public routes */
const detailsView = () =>
  import(/* webpackChunkName: "cm-details" */ "./Details.vue")

/** Management routes */
const manageDetailsView = () =>
  import(/* webpackChunkName: "cm-details" */ "./ManageDetails.vue")

export const root = [
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "/competition/:cm(\\d+)/edit",
    component: manageDetailsView,
    props: true,
  },
]

export const details = [
  {
    ...competitionDetails,
    path: "",
    component: detailsView,
    props: true,
  },
]
