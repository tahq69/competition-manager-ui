import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

import competitions from "@/Modules/Competitions/Routes"
import { home, posts } from "@/Modules/Posts/Routes"
import teams from "@/Modules/Teams/Routes"
import auth from "@/Modules/User/Routes"

export default new Router({
  mode: "history",
  routes: [
    teams, posts, home, auth, competitions,
    { path: "/auth", redirect: "/auth/login" },
    { path: "/password/reset/:token", redirect: "/auth/password/reset/:token" },
    { path: "*", redirect: "/home" },
  ],
})
