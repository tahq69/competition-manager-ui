import { Location, RouteConfig } from "vue-router"

import {
  authProfile,
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
  },
  {
    ...authProfile,
    component: profileVue,
    path: "/profile",
    meta: { auth: true },
  },
  {
    ...profile,
    component: profileVue,
    path: "/profile/:id(\\d+)",
  },
  {
    ...signUp,
    component: SignUp,
    path: "/sign-up",
  },
  {
    ...forgotPassword,
    component: forgotPasswordVue,
    path: "/auth/password/email",
  },
  {
    ...resetPassword,
    component: resetPasswordVue,
    path: "/auth/password/reset/:token",
  },
] as RouteConfig[]
