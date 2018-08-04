import { RouteConfig } from "vue-router";

import {
  authProfile,
  forgotPassword,
  login,
  profile,
  resetPassword,
  signUp,
  createRoute
} from "@/router/routes";
import { Id } from "@/typings";

import Login from "@/modules/user/views/Login.vue";
import SignUp from "@/modules/user/views/SignUp.vue";

import resetPasswordVue from "@/modules/user/views/ResetPassword.vue";
import forgotPasswordVue from "@/modules/user/views/ForgotPassword.vue";
import profileVue from "@/modules/user/views/Profile.vue";

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
    props: true,
    path: "/auth/password/reset/:token"
  }
] as RouteConfig[];

export const userProfileRoute = (p: { user: Id }) =>
  createRoute(profile, p, {});
