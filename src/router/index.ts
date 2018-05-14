import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

Vue.use(Router);

import NotFound from "@/components/NotFound.vue";

import { root as competitions } from "#/competitions/routes";
import { home, posts } from "#/posts/routes";
import { teams } from "#/teams/routes";
import user from "#/user/routes";

const routes = [
  home,
  ...competitions,
  ...user,
  ...posts,
  ...teams,
  { path: "/auth", redirect: "/login" },
  { path: "/password/reset/:token", redirect: "/auth/password/reset/:token" },
  { path: "/", redirect: "/home" },
  { path: "", redirect: "/home" },
  { path: "*", component: NotFound }
];

export default new Router({
  mode: "history",
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active"
});
