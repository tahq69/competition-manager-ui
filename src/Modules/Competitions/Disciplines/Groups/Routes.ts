import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionDisciplineGroups,
  manageCompetitionDisciplineGroups,
} from "@/Router/Routes"

/** Public routes */
const groupsView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./DisciplineGroups.vue")

/** Management routes */
const manageGroups = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageGroups.vue")

export const groups: RouteConfig[] = [
  {
    ...competitionDisciplineGroups,
    component: groupsView,
    path: "groups",
    props: true,
  },
  {
    ...manageCompetitionDisciplineGroups,
    component: manageGroups,
    path: "groups/manage",
    props: true,
  },
]
