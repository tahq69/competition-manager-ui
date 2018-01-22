import { RouteConfig } from "vue-router"

import * as roles from "@/Components/Auth/Roles"
import {
  competitionDisciplineGroups,
} from "@/Router/Routes"

/** Public routes */
const groupsView = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./DisciplineGroups.vue")

/** Management routes */
const manageGroup = () =>
  import(/* webpackChunkName: "cm-discipline" */ "./ManageGroup.vue")

export const groups: RouteConfig[] = [
  {
    ...competitionDisciplineGroups,
    component: groupsView,
    path: "groups",
    props: true,
  },
]
