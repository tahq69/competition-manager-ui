import { Location, RouteConfig } from "vue-router"

import { competitionDetails, manageCompetitionDetails } from "@/Router/Routes"

const requiresAuth = { requiresAuth: true }

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
    meta: { requiresAuth },
    path: "edit",
    component: manageDetails,
    props: true,
  } as RouteConfig,
]

export default routes
