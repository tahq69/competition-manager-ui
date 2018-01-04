import Vue from "vue"
import Router, { RouteConfig } from "vue-router"

Vue.use(Router)

import competitions from "@/Modules/Competitions/Routes"
import { home, posts } from "@/Modules/Posts/Routes"
import teams from "@/Modules/Teams/Routes"
import user from "@/Modules/User/Routes"

export default new Router({
  mode: "history",
  routes: [
    home, ...competitions, ...user, ...posts, ...teams,
    { path: "/auth", redirect: "/login" },
    { path: "/password/reset/:token", redirect: "/auth/password/reset/:token" },
    { path: "*", redirect: "/home" },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
})
