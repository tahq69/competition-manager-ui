import { Location, RouteConfig } from "vue-router"

import {
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
} from "@/Router/Routes"

import Login from "./Login.vue"
import SignUp from "./SignUp.vue"

const resetPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./ResetPassword.vue")

const forgotPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./ForgotPassword.vue")

const profileVue = () => import(/* webpackChunkName: "user" */ "./Profile.vue")

export default [
  {
    ...login,
    component: Login,
    path: "/login",
  } as RouteConfig,
  {
    ...profile,
    component: profileVue,
    path: "/profile/:id?",
  } as RouteConfig,
  {
    ...signUp,
    component: SignUp,
    path: "/sign-up",
  } as RouteConfig,
  {
    ...forgotPassword,
    component: forgotPasswordVue,
    path: "/auth/password/email",
  } as RouteConfig,
  {
    ...resetPassword,
    component: resetPasswordVue,
    path: "/auth/password/reset/:token",
  } as RouteConfig,
]
