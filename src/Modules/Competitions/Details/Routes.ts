import { Location, Route, RouteConfig } from "vue-router"

import { competitionDetails, manageCompetitionDetails } from "@/Router/Routes"

const requiresAuth = { requiresAuth: true }

/** Public routes */
const details = () =>
  import(/* webpackChunkName: "cm-details" */ "./Details.vue")

/** Management routes */
const manageDetails = () =>
  import(/* webpackChunkName: "cm-details" */ "./ManageDetails.vue")

const convertPropId = (route: Route) => ({
  competitionId: parseInt(route.params.competition_id, 10),
})

const routes: RouteConfig[] = [
  {
    ...competitionDetails,
    path: "",
    component: details,
    props: convertPropId,
  } as RouteConfig,
  {
    ...manageCompetitionDetails,
    meta: { requiresAuth },
    path: "edit",
    component: manageDetails,
    props: convertPropId,
  } as RouteConfig,
]

export default routes
