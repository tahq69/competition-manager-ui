import { RouteConfig } from "vue-router";

import { competitionMembers, createRoute } from "@/router/routes";
import { Id, PagingParams } from "@/typings";

/** Public routes */
import membersView from "./views/Members.vue";

/** Management routes */

export const members: RouteConfig[] = [
  {
    ...competitionMembers,
    path: "members/:page(\\d+)/:sort/:direction/:pageSize(\\d+)",
    component: membersView,
    props: true
  }
];

export const root: RouteConfig[] = [
  /*{
    path: "/competition/:cm(\\d+)/member/:member(\\d+)",
    component: memberView,
    props: true,
    children: [
      {
        ...competitionArea,
        path: "",
        component: areaDetailsView,
        props: true
      }
    ]
  }*/
];

export function competitionMembersRoute(p: { cm: Id } & PagingParams) {
  return createRoute(competitionMembers, p);
}
