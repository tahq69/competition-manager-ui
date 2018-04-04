import { Location, RouteConfig } from "vue-router";

import {
  authProfile,
  convertParams,
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp
} from "@/router/routes";
import { Id } from "@/typings";

import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";

const resetPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./views/ResetPassword.vue");

const forgotPasswordVue = () =>
  import(/* webpackChunkName: "user" */ "./views/ForgotPassword.vue");

const profileVue = () =>
  import(/* webpackChunkName: "user" */ "./views/Profile.vue");

export default [
  {
    ...login,
    component: Login,
    path: "/login"
  },
  {
    ...authProfile,
    component: profileVue,
    path: "/profile",
    meta: { auth: true }
  },
  {
    ...profile,
    component: profileVue,
    path: "/profile/:user(\\d+)"
  },
  {
    ...signUp,
    component: SignUp,
    path: "/sign-up"
  },
  {
    ...forgotPassword,
    component: forgotPasswordVue,
    path: "/auth/password/email"
  },
  {
    ...resetPassword,
    component: resetPasswordVue,
    path: "/auth/password/reset/:token"
  }
] as RouteConfig[];

export const userProfileRoute = (p: { user: Id }) => ({
  ...profile,
  params: convertParams(p)
});
