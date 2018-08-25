import { RouteConfig } from "vue-router";

import * as roles from "@/components/auth/roles";
import {
  competitionDiscipline,
  competitionDisciplines,
  createCompetitionDiscipline,
  createRoute,
  manageCompetitionDiscipline
} from "@/router/routes";
import { Id } from "@/typings";

import { groups } from "../groups/routes";

/** Public routes */
import disciplinesView from "./views/Disciplines.vue";
import disciplineView from "./views/Discipline.vue";
import disciplineDetails from "./views/DisciplineDetails.vue";

/** Management routes */
import manageDiscipline from "./views/ManageDiscipline.vue";

export const disciplines = [
  {
    ...competitionDisciplines,
    component: disciplinesView,
    path: "disciplines",
    props: true
  }
];

export const root: RouteConfig[] = [
  {
    ...createCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "/competition/:cm(\\d+)/discipline/manage/new",
    props: true
  },
  {
    ...manageCompetitionDiscipline,
    component: manageDiscipline,
    meta: { auth: true, teamRoles: [roles.MANAGE_COMPETITION_DISCIPLINES] },
    path: "/competition/:cm(\\d+)/discipline/manage/:discipline(\\d+)",
    props: true
  },
  {
    component: disciplineView,
    path: "/competition/:cm(\\d+)/discipline/:discipline(\\d+)",
    props: true,
    children: [
      {
        ...competitionDiscipline,
        component: disciplineDetails,
        path: "",
        props: true
      },
      ...groups
    ]
  }
];

export const cmDisciplinesRoute = (p: { cm: Id }) =>
  createRoute(competitionDisciplines, p, {});

export const cmDisciplineRoute = (p: { cm: Id; discipline: Id }) =>
  createRoute(competitionDiscipline, p, {});

export const createCmDisciplineRoute = (p: { cm: Id }) =>
  createRoute(createCompetitionDiscipline, p, {});

export const manageCmDisciplineRoute = (p: { cm: Id; discipline: Id }) =>
  createRoute(manageCompetitionDiscipline, p, {});
