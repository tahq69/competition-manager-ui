import { Location, Route, RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import { competitionDetails, manageCompetitionDetails } from "@/Router/Routes"

/** Public routes */
const details = () =>
  import(/* webpackChunkName: "cm-details" */ "./Details.vue")

/** Management routes */
const manageDetails = () =>
  import(/* webpackChunkName: "cm-details" */ "./ManageDetails.vue")

const routes: RouteConfig[] = [
  {
    ...competitionDetails,
    path: "",
    component: details,
    props: true,
  } as RouteConfig,
  {
    ...manageCompetitionDetails,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITIONS] },
    path: "edit",
    component: manageDetails,
    props: true,
  } as RouteConfig,
]

export default routes
