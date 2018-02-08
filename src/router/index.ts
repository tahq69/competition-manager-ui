import Vue from "vue"
import Router, { RouteConfig } from "vue-router"

Vue.use(Router)

import NotFound from "@/Components/NotFound.vue"

import { root as competitions } from "@/Modules/Competitions/Routes"
import { home, posts } from "@/Modules/Posts/Routes"
import { teams } from "@/Modules/Teams/Routes"
import user from "@/Modules/User/Routes"

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
  { path: "*", component: NotFound },
]

export default new Router({
  mode: "history",
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
})
